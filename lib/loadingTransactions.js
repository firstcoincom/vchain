'use strict';

/**
* Set timestamp on loading for NOR tendered
* @param {firstcoin.shipping.SetLoadingNORTenderedTimestamp} transaction
* @transaction
*/
async function setNORTenderedTimestamp(transaction)
{
    transaction.loading.NORTendered = transaction.timestamp;

    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Loading');
    await assetRegistry.update(transaction.loading);
}

/**
* Set timestamp on loading for documents on board
* @param {firstcoin.shipping.SetLoadingDocumentsOnBoardTimestamp} transaction
* @transaction
*/
async function setDocumentsOnBoardTimestamp(transaction)
{
    transaction.loading.documentsOnBoard = transaction.timestamp;

    const assetRegistry = await getAssetRegistry('firstcoin.shipping.Loading');
    await assetRegistry.update(transaction.loading);
}
