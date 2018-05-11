import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace firstcoin.shipping{
   export class Contract extends Asset {
      contractId: string;
      voyageNumber: string;
      ETA: Date;
      cargo: CargoItem[];
      events: ContractEvent[];
      vessel: Vessel;
      departure: Terminal;
      destination: Terminal;
      pilot: Pilot;
      captain: Captain;
      towageCompany: TowageCompany;
      shippingCompany: ShippingCompany;
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
   export class ContractEvent {
      description: string;
      timestamp: Date;
      creator: Participant;
      type: EventType;
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
   export class UpdateETA extends Transaction {
      contract: Contract;
      newETA: Date;
   }
   export class AddEvent extends Transaction {
      contract: Contract;
      description: string;
      type: EventType;
   }
   export class Arrival extends Event {
      detail: string;
   }
// }
