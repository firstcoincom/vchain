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

/**
* Add an event to a contract
* @param {firstcoin.shipping.AddEvent} add
* @transaction
*/
async function addEvent(add)
{
    // initialize a new ContractEvent
    var event = getFactory().newResource('firstcoin.shipping', 'ContractEvent',
        add.eventId);

    // modify ContractEvent
    event.contract = add.contract;
    event.creator = getCurrentParticipant();
    event.type = add.type;
    event.description = add.description;
    event.timestamp = add.timestamp;

    // update contract
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.ContractEvent');
    await assetRegistry.add(event);
}
