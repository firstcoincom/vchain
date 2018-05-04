import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';

// export namespace firstcoin.shipping{
   export class Contract extends Asset {
      contractId: string;
      vesselName: string;
      voyageNumber: string;
      departure: Terminal;
      destination: Terminal;
      ETA: Date;
      cargo: CargoItem[];
      operationType: Operation;
      nominatedQuantity: number;
      wscFlat: number;
      wscPercent: number;
      overageRate: number;
      freightCommission: number;
      demurrageRate: number;
      operationTime: number;
      charterDate: Date;
      charterer: Charterer;
      opt1: Option1;
      opt2: Option2;
      opt3: Option3;
      allowedLayTime: Date;
      maxQuantity: number;
      minQuantity: number;
      validated: boolean;
   }
   export class Option1 extends Asset {
      optionId: string;
      rate: number;
   }
   export class Option2 extends Asset {
      optionId: string;
      rate: number;
   }
   export class Option3 extends Asset {
      optionId: string;
      rate: number;
   }
   export enum Operation {
      LOADING,
      DISCHARGING,
   }
   export class CargoItem {
      name: string;
      quantity: number;
      type: CargoType;
   }
   export enum CargoType {
      CONTAINER_CARGO,
      LIQUID_BULK,
      DRY_BULK,
      BREAK_BULK,
      RORO,
   }
   export class ContractEvent extends Asset {
      eventId: string;
      contract: Contract;
      creator: Participant;
      type: EventType;
      description: string;
      timestamp: Date;
   }
   export enum EventType {
      ARRIVAL,
      DEPARTURE,
      DELAY,
   }
   export class Vessel extends Asset {
      imoNumber: string;
      name: string;
   }
   export class Terminal extends Participant {
      terminalId: string;
   }
   export class Pilot extends Participant {
      pilotId: string;
   }
   export class Captain extends Participant {
      captainId: string;
   }
   export class TowageCompany extends Participant {
      companyId: string;
   }
   export class ShippingCompany extends Participant {
      companyId: string;
   }
   export class Charterer extends Participant {
      chartererId: string;
      desc: string;
      email: string;
   }
   export class VoyageManager extends Participant {
      voyagerId: string;
      desc: string;
      email: string;
   }
   export class UpdateETA extends Transaction {
      contract: Contract;
      newETA: Date;
   }
   export class AddEvent extends Transaction {
      contract: Contract;
      eventId: string;
      description: string;
      type: EventType;
   }
// }
