'use strict';

/**
* Update ETA of shipment
* @param {firstcoin.shipping.UpdateETA} update
* @transaction
*/
async function updateETA(update)
{
    update.nomination.ETA = update.newETA;
    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
    await assetRegistry.update(update.nomination);
}

/**
* Create a nomination
* @param {firstcoin.shipping.CreateNomination} make
* @transaction
*/
async function createNomination(make)
{
    // initialize new nomination
    const factory = getFactory();
    let n = factory.newResource('firstcoin.shipping', 'Nomination',
        make.nominationId);

    // assign stuff
    n.vesselName = make.vesselName;
    n.IMONumber = make.IMONumber;
    n.voyageNumber = make.voyageNumber;
    n.departure = make.departure;
    n.destination = make.destination;
    n.ETA = make.ETA;
    n.cargo = make.cargo;
    n.operationType = make.operationType;
    n.nominatedQuantity = make.nominatedQuantity;
    n.wscFlat = make.wscFlat;
    n.wscPercent = make.wscPercent;
    n.overageRate = make.overageRate;
    n.freightCommission = make.freightCommission;
    n.demurrageRate = make.demurrageRate;
    n.operationTime = make.operationTime;
    n.charterDate = make.charterDate;
    n.option1 = make.option1;
    n.option2 = make.option2;
    n.option3 = make.option3;
    n.allowedLayTimeHours = make.allowedLayTimeHours;
    n.charterer = make.charterer;
    n.voyageManager = make.voyageManager;
    n.shippingCompany = make.shippingCompany;
    n.maxQuantity = make.maxQuantity;
    n.minQuantity = make.minQuantity;
    n.madeBy = getCurrentParticipant();
    n.verified = false;
    n.loadingDone = false;
    n.dischargeDone = false;
    n.captain = make.captain;

    // add to asset registry
    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
    await assetRegistry.add(n);
}

/**
* Verification
* @param {firstcoin.shipping.Verification} verify
* @transaction
*/
async function verification(verify)
{
    verify.nomination.verified = verify.verified;
    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
    await assetRegistry.update(verify.nomination);
}

/**
* Create documents and send emails
* @param {firstcoin.shipping.FinalizeNomination} transaction
* @transaction
*/
async function finalizeNomination(transaction)
{
    const factory = getFactory();
    const nom = transaction.nomination;

    // get loading and discharge documents related to the given nomination
    const nominationIDString = "resource:firstcoin.shipping.Nomination#"
        + nom.nominationId;
    const loadingDocs = await query('SelectLoadingByNomination',
        { 'id': nominationIDString });
    const dischargeDocs = await query('SelectDischargeByNomination',
        { 'id': nominationIDString });

    const load = loadingDocs[0];
    const discharge = dischargeDocs[0];

    // check that nomination has both required documents
    if (load == null && discharge == null)
    {
        throw new error('Nomination is missing loading or discharge document(s).');
    }

    // CALCULATE FREIGHT INVOICE

    let freightInvoice = 0;
    let wscPercent = nom.wscPercent / 100;

    if (load.BLQuantity < nom.minQuantity)
    {
        freightInvoice = nom.nominatedQuantity * nom.wscFlat * wscPercent;
    }
    else if (load.BLQuantity > nom.maxQuantity)
    {
        freightInvoice = load.BLQuantity * nom.wscFlat * wscPercent
            + (load.BLQuantity - nom.nominatedQuantity) * nom.wscFlat
            * wscPercent * nom.overageRate;
    }
    else
    {
        freightInvoice = load.BLQuantity * nom.wscFlat * wscPercent;
    }

    // CALCULATE FREIGHT COMMISSION INVOICE

    let freightCommission = freightInvoice * nom.freightCommission / 100;

    // LOAD PORT LAYTIME USED / LOAD PORT DEMURRAGE

    let loadDemurrage = 0;

    const msPerHour = 60 * 60 * 1000;

    const dob = load.documentsOnBoard.getTime() / msPerHour;
    const nor = load.NORTendered.getTime() / msPerHour;

    const loadLaytime = (dob - nor + 6) / 24;

    if (loadLaytime > nom.operationTime)
    {
        loadDemurrage = nom.demurrageRate * (loadLaytime - nom.operationTime);
    }

    // TOTAL DEMURRAGE INVOICE

    let totalDemurrage = 0;

    const hc = discharge.hoseConnected.getTime() / msPerHour;
    const hdc = discharge.hoseDisconnected.getTime() / msPerHour;

    const dischargeLaytime = (hc - hdc) / 24;

    if (loadLaytime + dischargeLaytime > nom.operationTime)
    {
        totalDemurrage = nom.demurrageRate
            * (loadLaytime + dischargeLaytime - nom.operationTime);
    }

    // send emails to participants on nomination
    let event = factory.newEvent('firstcoin.shipping', 'EmailEvent');
    event.voyageNumber = nom.voyageNumber;

    event.shippingCompanyEmail = nom.shippingCompany.email;
    event.chartererEmail = nom.charterer.email;
    event.voyageManagerEmail = nom.voyageManager.email;

    event.freightInvoice = freightInvoice;
    event.freightCommission = freightCommission;
    event.loadDemurrage = loadDemurrage;
    event.totalDemurrage = totalDemurrage;

    emit(event);
}

/**
* Initialize some test assets and participants useful for running a demo.
* @param { firstcoin.shipping.InitializeStuff } initializing - the initializing transaction
* @transaction
*/
async function initializeStuff(initializing)
{
    const factory = getFactory();
    const NS = 'firstcoin.shipping';

    // create the participants
    const terminal = factory.newResource(NS, 'Terminal', 'TER-1');
    const pilot = factory.newResource(NS, 'Pilot', 'PLT-1');
    const captain = factory.newResource(NS, 'Captain', 'CAP-1');
    const towageCompany = factory.newResource(NS, 'TowageCompany', 'TowC-1');
    const shippingCompany = factory.newResource(NS, 'ShippingCompany', 'ShipC-1');
    shippingCompany.email = 'team6.testmail1@gmail.com'
    const charterer = factory.newResource(NS, 'Charterer', 'CHAR-1');
    charterer.desc = 'EXXONMOBIL';
    charterer.email = 'team6.testmail2@gmail.com';
    const voyageManager = factory.newResource(NS, 'VoyageManager', 'VM-1');
    voyageManager.desc = 'Voyage Manager';
    voyageManager.email = 'team6.testmail3@gmail.com';
    //create loading


    // create the nomination
    const nomination = factory.newResource(NS, 'Nomination', 'NOM_001');
    nomination.vesselName = 'VAIL SPIRIT';
    nomination.IMONumber = 'IMO-123';
    nomination.voyageNumber = '16';
    nomination.departure = factory.newRelationship(NS, 'Terminal', 'BONNY OFFSHORE');
    nomination.destination = factory.newRelationship(NS, 'Terminal', 'ROTTERDAM');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    nomination.ETA = tomorrow;
    const cargo = factory.newConcept(NS, 'CargoItem');
    cargo.name = 'CRUDE OIL';
    cargo.quantity = '130000';
    cargo.cargoType = 'LIQUID_BULK';
    var cargos = new Array();
    cargos.push(cargo);
    nomination.cargo = cargos;
    nomination.operationType = 'DISCHARGING'
    nomination.nominatedQuantity = 130000;
    nomination.wscFlat = 10.47;
    nomination.wscPercent = 66.50;
    nomination.overageRate = 50.00;
    nomination.freightCommission = 2.50;
    nomination.demurrageRate = 30000;
    nomination.operationTime = 3.46;
    nomination.charterDate = new Date();
    nomination.charterer = factory.newRelationship(NS, 'Charterer', 'CHAR-1');
    const freightOption = factory.newConcept(NS, 'FreightOption');
    freightOption.rate = 1.2;
    nomination.option1 = freightOption;
    nomination.option2 = freightOption;
    nomination.option3 = freightOption;
    nomination.allowedLayTimeHours = 3.00;
    nomination.charterer = charterer;
    nomination.voyageManager = voyageManager;
    nomination.shippingCompany = shippingCompany;
    nomination.maxQuantity = 130000;
    nomination.minQuantity = 130000;
    nomination.madeBy = voyageManager;
    nomination.verified = true;
    nomination.captain = captain;
    nomination.loadingCreated = true;
    nomination.dischargeCreated = true;
    nomination.loadingDone = true;
    nomination.dischargeDone = true;

    //loading
    const loading = factory.newResource(NS, 'Loading', 'Load_001');
    loading.nomination = nomination;
    const twoday1 = new Date();
    twoday1.setDate(twoday1.getDate() + 2);
    loading.NORTendered = new Date();
    loading.documentsOnBoard = twoday1;
    loading.BLQuantity = 138559;

    //discharge
    const tenday = new Date();
    tenday.setDate(tenday.getDate() + 10);
    const discharge = factory.newResource(NS, 'Discharge', 'Discharge_001');
    discharge.nomination = nomination;
    discharge.hoseConnected = tenday;
    const twoday = new Date();
    twoday.setDate(twoday.getDate() + 12);
    discharge.hoseDisconnected = twoday;

    // add the terminals
    const terminalRegistry = await getParticipantRegistry(NS + '.Terminal');
    await terminalRegistry.addAll([terminal]);
    // add the pilots
    const pilotRegistry = await getParticipantRegistry(NS + '.Pilot');
    await pilotRegistry.addAll([pilot]);
    // add the captains
    const captainRegistry = await getParticipantRegistry(NS + '.Captain');
    await captainRegistry.addAll([captain]);
    // add the towage companies
    const towageRegistry = await getParticipantRegistry(NS + '.TowageCompany');
    await towageRegistry.addAll([towageCompany]);
    // add the shipping companies
    const shippingCompanyRegistry = await getParticipantRegistry(NS + '.ShippingCompany');
    await shippingCompanyRegistry.addAll([shippingCompany]);
    // add the chaterers
    const chartererRegistry = await getParticipantRegistry(NS + '.Charterer');
    await chartererRegistry.addAll([charterer]);
    // add the voyage managers
    const voyageManagerRegistry = await getParticipantRegistry(NS + '.VoyageManager');
    await voyageManagerRegistry.addAll([voyageManager]);
    // add the nominations
    const nominationRegistry = await getAssetRegistry(NS + '.Nomination');
    await nominationRegistry.addAll([nomination]);
    // add the laodings
    const loadingRegistry = await getAssetRegistry(NS + '.Loading');
    await loadingRegistry.addAll([loading]);


    const dischargeRegistry = await getAssetRegistry(NS + '.Discharge');
    await dischargeRegistry.addAll([discharge]);

}
