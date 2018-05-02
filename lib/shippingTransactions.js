'use strict';

/**
* Update ETA of shipment
* @param {firstcoin.shipping.UpdateETA} update
* @transaction
*/
async function updateETA(update)
{
    update.contract.ETA = update.newETA;
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Contract');
    await assetRegistry.update(update.contract);
}
