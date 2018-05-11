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

    var event = factory.newEvent('firstcoin.shipping', 'EmailEvent');
    event.voyageNumber = transaction.nomination.voyageNumber;
    event.emails = Array();
    event.emails.push(transaction.nomination.charterer.email);
    event.emails.push(transaction.nomination.voyageManager.email);
    event.emails.push(transaction.nomination.shippingCompany.email);

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
    const terminal = factory.newResource(NS, 'Terminal', 'TER-' + Math.random());
    const pilot = factory.newResource(NS, 'Pilot', 'PLT-' + Math.random());
    const captain = factory.newResource(NS, 'Captain', 'CAP-' + Math.random());
    const towageCompany = factory.newResource(NS, 'TowageCompany', 'TowC-' + Math.random());
    const shippingCompany = factory.newResource(NS, 'ShippingCompany', 'ShipC-' + Math.random());
    shippingCompany.email = 'shippingcompany@email.com'
    const charterer = factory.newResource(NS, 'Charterer', 'CHAR-1');
    charterer.desc = 'EXXONMOBIL';
    charterer.email = 'hscong8@yahoo.com';

    const voyageManager = factory.newResource(NS, 'VoyageManager', 'VM-1');
    voyageManager.desc = 'Voyage Manager';
    voyageManager.email = 'vinzbalitaan@hotmail.com';

    // create the nomination
    const nomination = factory.newResource(NS, 'Nomination', 'NOM_001');
    nomination.vesselName = 'VAIL SPIRIT';
    nomination.IMONumber = 'IMO-123';
    nomination.voyageNumber = '16';
    nomination.departure = factory.newRelationship(NS, 'Terminal', 'BONNY OFFSHORE');
    nomination.destination = factory.newRelationship(NS, 'Terminal', 'ROTTERDAM');
    const tomorrow = initializing.timestamp;
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
    nomination.charterDate = initializing.timestamp;
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
