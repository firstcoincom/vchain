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
