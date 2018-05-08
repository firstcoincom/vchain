'use strict';

/**
* Set timestamp on discharge for hose connection
* @param {firstcoin.shipping.SetDischargeTimestamp} transaction
* @transaction
*/
async function setConnectionTimestamp(transaction)
{
    transaction.discharge.hoseConnected = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Discharge');
    await assetRegistry.update(transaction.discharge);
}

/**
* Set timestamp on discharge for hose disconnection
* @param {firstcoin.shipping.SetDischargeTimestamp} transaction
* @transaction
*/
async function setDisconnectionTimestamp(transaction)
{
    transaction.discharge.hoseDisconnected = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Discharge');
    await assetRegistry.update(transaction.discharge);
}

/**
* Create a discharge document
* @param {firstcoin.shipping.CreateDocument} make
* @transaction
*/
async function createDischarge(make)
{
    // initialize new nomination
    var factory = getFactory();
    var discharge = factory.newResource('firstcoin.shipping', 'Discharge',
        make.id);

    // assign stuff
    discharge.nomination = make.nomination;

    // add to asset registry
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Discharge');
    await assetRegistry.add(discharge);
}
