import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace firstcoin.shipping{
   export class Nomination extends Asset {
      nominationId: string;
      vesselName: string;
      IMONumber: string;
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
      option1: FreightOption;
      option2: FreightOption;
      option3: FreightOption;
      allowedLayTimeHours: number;
      chartererEmail: string;
      voyageManagerEmail: string;
      shippingCompanyEmail: string;
      maxQuantity: number;
      minQuantity: number;
      madeBy: Participant;
      verified: boolean;
   }
   export class FreightOption {
      rate: number;
   }
   export class CargoItem {
      name: string;
      quantity: string;
      cargoType: CargoType;
   }
   export enum Operation {
      LOADING,
      DISCHARGING,
   }
   export enum CargoType {
      CONTAINER_CARGO,
      LIQUID_BULK,
      DRY_BULK,
      BREAK_BULK,
      RORO,
   }
   export class Discharge extends Asset {
      dischargeId: string;
      nomination: Nomination;
      hoseConnected: Date;
      hoseDisconnected: Date;
   }
   export class Loading extends Asset {
      loadingId: string;
      nomination: Nomination;
      BLQuantity: number;
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
   export class Verification extends Transaction {
      nomination: Nomination;
      verified: boolean;
      verifiedBy: Participant;
   }
   export class UpdateETA extends Transaction {
      nomination: Nomination;
      newETA: Date;
   }
   export class SetDischargeTimestamp extends Transaction {
      discharge: Discharge;
   }
   export class InitializeStuff extends Transaction {
   }
// }
