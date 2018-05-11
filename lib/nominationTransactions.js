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
