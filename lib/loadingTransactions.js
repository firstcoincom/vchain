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

/**
* Create a loading document
* @param {firstcoin.shipping.CreateDocument} make
* @transaction
*/
async function createLoading(make)
{
    // initialize new nomination
    var factory = getFactory();
    var loading = factory.newResource('firstcoin.shipping', 'Loading',
        make.id);

    // assign stuff
    loading.nomination = make.nomination;

    // add to asset registry
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Loading');
    await assetRegistry.add(loading);
}
