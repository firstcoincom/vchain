'use strict';

/**
* Emit an event
* @param {firstcoin.shipping.TestTransaction} transaction
* @transaction
*/
async function testTransaction(transaction)
{
    var factory = getFactory();
    var event = factory.newEvent('firstcoin.shipping', 'EmailEvent');

    event.address = transaction.address;
    event.subject = transaction.subject;
    event.body = transaction.body;

    emit(event);
}
