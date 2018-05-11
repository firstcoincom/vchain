'use strict';

/**
* Update ETA of shipment
* @param {firstcoin.shipping.UpdateETA} update
* @transaction
*/
async function updateETA(update)
{
    update.nomination.ETA = update.newETA;
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
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
    var factory = getFactory();
    var n = factory.newResource('firstcoin.shipping', 'Nomination',
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

    // add to asset registry
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
    await assetRegistry.add(n);
}

/**
* Verification
* @param {firstcoin.shipping.Verification} verify
* @transaction
*/
async function verification(verify)
{
    verify.nomination.contractVerified = verify.verified;
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Nomination');
    await assetRegistry.update(verify.nomination);
}

/**
* Create documents and send emails
* @param {firstcoin.shipping.FinalizeNomination} transaction
* @transaction
*/
async function finalizeNomination(transaction)
{
    var factory = getFactory();

    // var nominationIDString = "resource:firstcoin.shipping.Nomination#"
    //     + transaction.nomination.nominationId;

    // let loadingDocs = await query('SelectLoadingByNomination',
    //     { 'id': nominationIDString });
    // let dischargeDocs = await query('SelectDischargeByNomination',
    //     { 'id': nominationIDString });

    var chartererEvent = factory.newEvent('firstcoin.shipping', 'EmailEvent');
    chartererEvent.address = transaction.nomination.charterer.email;
    chartererEvent.subject = "Charterer email";
    chartererEvent.body = "This is a test email for charterers!";

    var voyageManagerEvent = factory.newEvent('firstcoin.shipping', 'EmailEvent');
    voyageManagerEvent.address = transaction.nomination.voyageManager.email;
    voyageManagerEvent.subject = "voyageManager email";
    voyageManagerEvent.body = "This is a test email for voyageManagers!";

    var shippingCompanyEvent = factory.newEvent('firstcoin.shipping', 'EmailEvent');
    shippingCompanyEvent.address = transaction.nomination.shippingCompany.email;
    shippingCompanyEvent.subject = "shippingCompany email";
    shippingCompanyEvent.body = "This is a test email for shippingCompanys!";

    // this should all be merged into a single event
    emit(chartererEvent);
    emit(voyageManagerEvent);
    emit(shippingCompanyEvent);
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
    const charterer = factory.newResource(NS, 'Charterer', 'CHAR-1');
    charterer.desc = 'Charterer';
    charterer.email = 'charterer@email.com';

    const voyageManager = factory.newResource(NS, 'VoyageManager', 'VM-1');
    voyageManager.desc = 'Voyage Manager';
    voyageManager.email = 'voyageManager@email.com';

    // create the nomination
    const nomination = factory.newResource(NS, 'Nomination', 'NOM_001');
    nomination.vesselName = 'Canada Cruiser';
    nomination.IMONumber = 'IMO-123';
    nomination.voyageNumber = 'V-123';
    nomination.departure = factory.newRelationship(NS, 'Terminal', 'TER-1');
    nomination.destination = factory.newRelationship(NS, 'Terminal', 'TER-1');
    const tomorrow = initializing.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    nomination.ETA = tomorrow;

    const cargo = factory.newConcept(NS, 'CargoItem');
    cargo.name = 'Honda Civic';
    cargo.quantity = '9999';
    cargo.cargoType = 'RORO';
    var cargos = new Array();
    cargos.push(cargo);
    nomination.cargo = cargos;

    nomination.operationType = 'DISCHARGING'
    nomination.nominatedQuantity = 8.6;
    nomination.wscFlat = 1.2;
    nomination.wscPercent = 2.0;
    nomination.overageRate = 3.0;
    nomination.freightCommission = 5.0;
    nomination.demurrageRate = 2.0;
    nomination.operationTime = 48;
    nomination.charterDate = initializing.timestamp;
    nomination.charterer = factory.newRelationship(NS, 'Charterer', 'CHAR-1');

    const freightOption = factory.newConcept(NS, 'FreightOption');
    freightOption.rate = 1.2;
    nomination.option1 = freightOption;
    nomination.option2 = freightOption;
    nomination.option3 = freightOption;

    nomination.allowedLayTimeHours = 5;
    nomination.madeBy = voyageManager;
    nomination.verified = false;


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
}
