'use strict';

/**
* Set timestamp on loading for NOR tendered
* @param {firstcoin.shipping.SetLoadingTimestamp} transaction
* @transaction
*/
async function setNORTenderedTimestamp(transaction)
{
    transaction.loading.NORTendered = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Loading');
    await assetRegistry.update(transaction.loading);
}

/**
* Set timestamp on loading for documents on board
* @param {firstcoin.shipping.SetLoadingTimestamp} transaction
* @transaction
*/
async function setNORTenderedTimestamp(transaction)
{
    transaction.loading.documentsOnBoard = transaction.timestamp;

    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Loading');
    await assetRegistry.update(transaction.loading);
}
