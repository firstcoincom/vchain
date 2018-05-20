/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DischargeService } from './Discharge.service';
import {SetDischargeConnectTimestamp, SetDischargeDisconnectTimestamp} from '../firstcoin.shipping';
import {SetDischargeConnectTimestampService} from '../SetDischargeConnectTimestamp/SetDischargeConnectTimestamp.service';
import 'rxjs/add/operator/toPromise';
import { SetDischargeConnectTimestampComponent } from '../SetDischargeConnectTimestamp/SetDischargeConnectTimestamp.component';
import { Transaction } from '../org.hyperledger.composer.system';
import { DataService } from '../data.service';
import { SetDischargeDisconnectTimestampService } from '../SetDischargeDisconnectTimestamp/SetDischargeDisconnectTimestamp.service';
import { NominationService } from '../Nomination/Nomination.service';
@Component({
	selector: 'app-Discharge',
	templateUrl: './Discharge.component.html',
	styleUrls: ['./Discharge.component.css'],
  providers: [DischargeService,SetDischargeConnectTimestampService,SetDischargeDisconnectTimestampService, NominationService]
})
export class DischargeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private nominationObj;
  private nomId;

  
      
          dischargeId = new FormControl("", Validators.required);
        
  
      
          nomination = new FormControl("", Validators.required);
        
  
      
          hoseConnected = new FormControl("", Validators.required);
        
  
      
          hoseDisconnected = new FormControl("", Validators.required);
        
  


  constructor(private serviceDischarge:DischargeService, 
    private setTimeStampConnectDischargeService:SetDischargeConnectTimestampService, 
    private setTimeStampDisconnectDischargeService:SetDischargeDisconnectTimestampService, 
    private serviceNomination:NominationService,
    fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          dischargeId:this.dischargeId,
        
    
        
          nomination:this.nomination,
        
    
        
          hoseConnected:this.hoseConnected,
        
    
        
          hoseDisconnected:this.hoseDisconnected
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceDischarge.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "firstcoin.shipping.Discharge",
      
        
          "dischargeId":this.dischargeId.value,
        
      
        
          "nomination":this.nomination.value,
        
      
        
          "hoseConnected":this.hoseConnected.value,
        
      
        
          "hoseDisconnected":this.hoseDisconnected.value
        
      
    };

    this.myForm.setValue({
      
        
          "dischargeId":null,
        
      
        
          "nomination":null,
        
      
        
          "hoseConnected":null,
        
      
        
          "hoseDisconnected":null
        
      
    });

    return this.serviceDischarge.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "dischargeId":null,
        
      
        
          "nomination":null,
        
      
        
          "hoseConnected":null,
        
      
        
          "hoseDisconnected":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "firstcoin.shipping.Discharge",
        
          
            "nomination":this.nomination.value,
          
        
    
        
          
            "hoseConnected":this.hoseConnected.value,
          
        
    
        
          
            "hoseDisconnected":this.hoseDisconnected.value
          
        
    
    };

    return this.serviceDischarge.updateAsset(form.get("dischargeId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  deleteAsset(): Promise<any> {

    return this.serviceDischarge.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }


  // refreshInstant(): Promise<any> {
  //   let tempList = [];
  //   this.currentId = this.nominationId.value;
  //   console.log(this.nominationId.value);
  //   return this.serviceNomination.getAsset(this.nominationId.value)
  //   .toPromise()
  //   .then((result) => {
  //     tempList.push(result);
  //     this.madeBy = result.madeBy;
  //     this.allAssets = tempList;
  //     if (!this.allAssets) {
  //       this.errorMessage = “ASSET LIST EMPTY”;
  //     }
  //   })
  //   .catch((error) => {
  //       if(error == ‘Server error’){
  //           this.errorMessage = “Could not connect to REST server. Please check your configuration details”;
  //       }
  //       else if(error == ‘404 - Not Found’){
  //                this.errorMessage = “404 - Could not find API route. Please check your available APIs.”
  //       }
  //       else{
  //           this.errorMessage = error;
  //       }
  //   });
  // }


  getForm(id: any): Promise<any>{

    return this.serviceDischarge.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "dischargeId":null,
          
        
          
            "nomination":null,
          
        
          
            "hoseConnected":null,
          
        
          
            "hoseDisconnected":null 
          
        
      };



      
        if(result.dischargeId){
          
            formObject.dischargeId = result.dischargeId;
          
        }else{
          formObject.dischargeId = null;
        }
      
        if(result.nomination){
          
            formObject.nomination = result.nomination;
          
        }else{
          formObject.nomination = null;
        }
      
        if(result.hoseConnected){
          
            formObject.hoseConnected = result.hoseConnected;
          
        }else{
          formObject.hoseConnected = null;
        }
      
        if(result.hoseDisconnected){
          
            formObject.hoseDisconnected = result.hoseDisconnected;
          
        }else{
          formObject.hoseDisconnected = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  addTransactionConnectHoses(id:string): Promise<any>{
    var transaction = {    
      $class: "firstcoin.shipping.SetDischargeConnectTimestamp",
      "discharge":"resource:firstcoin.shipping.Discharge#" + id ,
      "transactionId":"",
      "timestamp": Date.now()  
    };
    return this.setTimeStampConnectDischargeService.addTransaction(transaction)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.checkDischarging(id);
      // window.location.reload();
    })
    .catch((error) => {
      if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      }
      else{
          this.errorMessage = error;
      }
    });
  }

  addTransactionDisconnectHoses(id:string): Promise<any>{

    var transaction = {    
    $class: "firstcoin.shipping.SetDischargeDisconnectTimestamp",
      
        
    "discharge":"resource:firstcoin.shipping.Discharge#" + id ,
  

  
    "transactionId":"",
  

  
    "timestamp": Date.now()
  

    };
    return this.setTimeStampDisconnectDischargeService.addTransaction(transaction)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.checkDischarging(id);
      // window.location.reload();
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  /**
   * Function to check whether both NORtendered and DOConboard are completed for a specific loading asset
   * Also sets the nominationObj which is used in getNominationAsset()
   * @param id loadingId
   */
  checkDischarging(id: any): Promise<any> {
    console.log("checkLoading(" + id+ ")");
    return this.serviceDischarge.getAsset(id)
    .toPromise()
    .then((result) => {
      if (!result.hoseConnected || !result.hoseDisconnected) {
        console.log("hoseConnected or hoseDisconnected empty");
        window.location.reload();
      } else {
        console.log("VALID TO UPDATE NOM");
        this.nominationObj = result.nomination;
        this.getNominationAsset();
      }
    })
    .catch((error) => {
      if (error == 'Server error') {
        this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      } else {
        this.errorMessage = error;
      }
      window.location.reload();
    });
  }

  /**
   * Function to get nomination asset associated with discharge asset
   */
  getNominationAsset(): Promise<any> {
    this.nomId = this.nominationObj.split("#");

    return this.serviceNomination.getAsset(this.nomId[1])
    .toPromise()
    .then((result) => {
      this.updateNominationAsset(result);
      // window.location.reload();
    })
    .catch((error) => {
      if (error == 'Server error') {
        this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      } else {
        this.errorMessage = error;
      }
      window.location.reload();
    });
  }

  /**
   * Function to update loadingDone to true in nomination object
   * @param obj nominationObj
   */
  updateNominationAsset(obj: any): Promise<any> {
    // console.log(obj);
     var asset  = {
      $class: "firstcoin.shipping.Nomination",  
      "vesselName":obj.vesselName,
      "IMONumber":obj.IMONumber,
      "voyageNumber":obj.voyageNumber,
      "departure":obj.departure,
      "destination":obj.destination,
      "ETA":obj.ETA,
      "cargo":obj.cargo,
      "operationType":obj.operationType,
      "nominatedQuantity":obj.nominatedQuantity,
      "wscFlat":obj.wscFlat,
      "wscPercent":obj.wscPercent,
      "overageRate":obj.overageRate,
      "freightCommission":obj.freightCommission,
      "demurrageRate":obj.demurrageRate,
      "operationTime":obj.operationTime,
      "charterDate":obj.charterDate,
      "option1":obj.option1,
      "option2":obj.option2,
      "option3":obj.option3,
      "allowedLayTimeHours":obj.allowedLayTimeHours,
      "charterer":obj.charterer,
      "voyageManager":obj.voyageManager,
      "shippingCompany":obj.shippingCompany,
      "maxQuantity":obj.maxQuantity,
      "minQuantity":obj.minQuantity,
      "madeBy":obj.madeBy,
      "verified":obj.verified,
      "captain":obj.captain,
      "loadingDone":obj.loadingDone,
      "dischargeDone": true
    };
    console.log(asset);
    return this.serviceNomination.updateAsset(this.nomId[1], asset)
    .toPromise()
    .then((result) => {
      console.log("UPDATE SUCCESS");
      console.log(result);
      window.location.reload();
    })
    .catch((error) => {
      if (error == 'Server error') {
        this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      } else {
        this.errorMessage = error;
      }
      window.location.reload();
    });
  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "dischargeId":null,
        
      
        
          "nomination":null,
        
      
        
          "hoseConnected":null,
        
      
        
          "hoseDisconnected":null 
        
      
      });
  }

}
