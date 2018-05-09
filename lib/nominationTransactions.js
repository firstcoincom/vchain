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

// /**
// * Add an event to a contract
// * @param {firstcoin.shipping.MakeContract} make
// * @transaction
// */
// async function makingContract(make)
// {
//     // make.contract.vesselName = make.vesselName;
//     // make.contract.voyageNumber = make.voyageNumber;
//     // make.contract.departure = make.departure;
//     // make.contract.destination = make.destination;
//     // make.contract.ETA = make.ETA;
//     // make.contract.cargo = make.cargo;
//     // make.contract.operationType = make.operationType;
//     // make.contract.nominatedQuantity = make.nominatedQuantity;
//     // make.contract.wscFlat = make.wscFlat;
//     // make.contract.wscPercent = make.wscPercent; 
//     // make.contract.overageRate = make.overageRate;
//     // make.contract.freightCommission = make.freightCommission;
//     // make.contract.demurrageRate = make.demurrageRate;
//     // make.contract.operationTime = make.operationTime;
//     // make.contract.charterDate = make.charterDate;
//     // make.contract.charterer = make.charterer;
//     // make.contract.opt1 = make.opt1;
//     // make.contract.opt2 = make.opt2;
//     // make.contract.opt3 = make.opt3;
//     // make.contract.allowedLayTime = make.allowedLayTime;
//     // make.contract.maxQuantity = make.maxQuantity;
//     // make.contract.minQuantity = make.minQuantity;

//     make.madeBy = getCurrentParticipant();
//     // make.madeBy = getParticipantRegistry('firstcoin.shipping.VoyageManager');
//     if(make.verifiedBy == true)
//     {
//         make.verifiedBy.verifiedBy = getParticipantRegistry('firstcoin.shipping.Charterer');
//     }
//     let assetRegistry = await getAssetRegistry('firstcoin.shipping.Contract');
//     await assetRegistry.update(make.contract);
// }

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
 * Initialize some test assets and participants useful for running a demo.
 * @param {firstcoin.shipping.InitializeStuff} initializing - the initializing transaction
 * @transaction
 */
async function initializeStuff(initializing) {

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
    //nomination.madeBy = getParticipantRegistry('firstcoin.shipping.VoyageManager');
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