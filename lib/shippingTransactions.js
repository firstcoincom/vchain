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
    var event = getFactory().newConcept('firstcoin.shipping', 'ContractEvent');

    // modify ContractEvent
    event.description = add.description;
    event.timestamp = add.timestamp;
    event.creator = getCurrentParticipant();
    event.type = add.type;

    // add event to the contract's collection
    add.contract.events.push(event);

    // update contract
    let assetRegistry = await getAssetRegistry('firstcoin.shipping.Contract');
    await assetRegistry.update(add.contract);
}

/**
* Add an event to a contract
* @param {firstcoin.shipping.GetEvent} get
* @transaction
*/
async function getEvent(get)
{
    var event = null;
    get.contract.events.forEach(function (e)
    {
        if (e.type === get.type
            && (event == null || event.timestamp < e.timestamp))
        {
            event = e;
        }
    });

    return event;
}
