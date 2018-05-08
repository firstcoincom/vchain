'use strict';

/**
* Set timestamp on discharge for hose connection
* @param {firstcoin.shipping.SetDischargeTimestamp} transaction
* @transaction
*/
async function setConnectionTimestamp(transaction)
{
    transaction.discharge.hoseConnected = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.discharge.Discharge');
    assetRegistry.update(transaction.discharge);
}

/**
* Set timestamp on discharge for hose disconnection
* @param {firstcoin.shipping.SetDischargeTimestamp} transaction
* @transaction
*/
async function setDisconnectionTimestamp(transaction)
{
    transaction.discharge.hoseDisconnected = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.discharge.Discharge');
    assetRegistry.update(transaction.discharge);
}
