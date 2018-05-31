/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASISf,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NominationService } from './Nomination.service';
import 'rxjs/add/operator/toPromise';
import { LoadingService } from '../Loading/Loading.service';
import { DischargeService } from '../Discharge/Discharge.service';
import { FinalizeNominationService } from '../FinalizeNomination/FinalizeNomination.service';
@Component({
	selector: 'app-Nomination',
	templateUrl: './Nomination.component.html',
	styleUrls: ['./Nomination.component.css'],
  providers: [NominationService,LoadingService,DischargeService,FinalizeNominationService]
})
export class NominationComponent implements OnInit {

  myForm: FormGroup;
  Form2: FormGroup;
  Form3: FormGroup;

  private allAssets;
  private allCargoItems;
  private asset;
  private currentId;
  private errorMessage;
  private nomAsset;
  private nomId;
  private cargoItemList = [];
  private scrollMin = false;
  private scrollMax = false;
  private scrollCounter = 0;

          nominationId = new FormControl("", Validators.required);
          vesselName = new FormControl("", Validators.required);
          IMONumber = new FormControl("", Validators.required);
          voyageNumber = new FormControl("", Validators.required);
          departure = new FormControl("", Validators.required);
          destination = new FormControl("", Validators.required);
          ETA = new FormControl("", Validators.required);
          // cargo = new FormControl("", Validators.required);
          cargoName = new FormControl("", Validators.required);
          cargoQuantity = new FormControl("", Validators.required);
          cargoType = new FormControl("", Validators.required);
          operationType = new FormControl("", Validators.required);
          nominatedQuantity = new FormControl("", Validators.required);
          wscFlat = new FormControl("", Validators.required);
          wscPercent = new FormControl("", Validators.required);
          overageRate = new FormControl("", Validators.required);
          freightCommission = new FormControl("", Validators.required);
          demurrageRate = new FormControl("", Validators.required);
          operationTime = new FormControl("", Validators.required);
          charterDate = new FormControl("", Validators.required);
          option1 = new FormControl("", Validators.required);
          option2 = new FormControl("", Validators.required);
          option3 = new FormControl("", Validators.required);
          allowedLayTimeHours = new FormControl("", Validators.required);
          charterer = new FormControl("", Validators.required);
          voyageManager = new FormControl("", Validators.required);
          shippingCompany = new FormControl("", Validators.required);
          maxQuantity = new FormControl("", Validators.required);
          minQuantity = new FormControl("", Validators.required);
          madeBy = new FormControl("", Validators.required);
          verified = new FormControl("", Validators.required);
          captain = new FormControl("", Validators.required);
          captainId = new FormControl("", Validators.required);
  
  constructor(private serviceNomination:NominationService, 
    private serviceLoading:LoadingService, 
    private serviceDischarging:DischargeService,
    private serviceFinalize:FinalizeNominationService,
    fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {
    this.myForm = fb.group({
          nominationId:this.nominationId,
          vesselName:this.vesselName,
          IMONumber:this.IMONumber,
          voyageNumber:this.voyageNumber,
          departure:this.departure,
          destination:this.destination,
          ETA:this.ETA,
          operationType:this.operationType,
          nominatedQuantity:this.nominatedQuantity,
          wscFlat:this.wscFlat,
          wscPercent:this.wscPercent,
          overageRate:this.overageRate,
          freightCommission:this.freightCommission,
          demurrageRate:this.demurrageRate,
          operationTime:this.operationTime,
          charterDate:this.charterDate,
          option1:this.option1,
          option2:this.option2,
          option3:this.option3,
          allowedLayTimeHours:this.allowedLayTimeHours,
          charterer:this.charterer,
          voyageManager:this.voyageManager,
          shippingCompany:this.shippingCompany,
          maxQuantity:this.maxQuantity,
          minQuantity:this.minQuantity,
          madeBy:this.madeBy,
          verified:this.verified,
          captain:this.captain
          
    
    });

    this.Form2 = fb.group({
      captainId:this.captainId
    });

    this.Form3 = fb.group({
      cargoName:this.cargoName,
      cargoQuantity:this.cargoQuantity,
      cargoType:this.cargoType,
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceNomination.getAll()
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
    var freightOption1 = {$class: "firstcoin.shipping.FreightOption",
          "rate":this.option1.value
    }
    var freightOption2 = {$class: "firstcoin.shipping.FreightOption",
          "rate":this.option2.value
    }
    var freightOption3 = {$class: "firstcoin.shipping.FreightOption",
          "rate":this.option3.value
    }
    var cargoItem = [{
      $class: "firstcoin.shipping.CargoItem",
      "name":this.cargoName.value,
      "quantity":this.cargoQuantity.value,
      "cargoType":this.cargoType.value
    }];

    this.asset = {
      $class: "firstcoin.shipping.Nomination",
      
      
        
          "nominationId":this.nominationId.value,
          "vesselName":this.vesselName.value,
          "IMONumber":this.IMONumber.value,
          "voyageNumber":this.voyageNumber.value,
          "departure":this.departure.value,
          "destination":this.destination.value,
          "ETA":this.ETA.value,
          "cargo": cargoItem,
          "operationType":this.operationType.value,
          "nominatedQuantity":this.nominatedQuantity.value,
          "wscFlat":this.wscFlat.value,
          "wscPercent":this.wscPercent.value,
          "overageRate":this.overageRate.value,
          "freightCommission":this.freightCommission.value,
          "demurrageRate":this.demurrageRate.value,
          "operationTime":this.operationTime.value,
          "charterDate":this.charterDate.value,
          "option1":freightOption1,
          "option2":freightOption2,
          "option3":freightOption3,
          "allowedLayTimeHours":this.allowedLayTimeHours.value,
          "charterer":this.charterer.value,
          "voyageManager":this.voyageManager.value,
          "shippingCompany":this.shippingCompany.value,
          "maxQuantity":this.maxQuantity.value,
          "minQuantity":this.minQuantity.value,
          "madeBy":this.madeBy.value,
          "verified":false,
          "captain":this.captain.value
      
    };

    this.myForm.setValue({
      
        
          "nominationId":null,
          "vesselName":null,
          "IMONumber":null,
          "voyageNumber":null,
          "departure":null,
          "destination":null,
          "ETA":null,
          "cargoName":null,
          "cargoQuantity":null,
          "cargoType":null,
          "operationType":null,
          "nominatedQuantity":null,
          "wscFlat":null,
          "wscPercent":null,
          "overageRate":null,
          "freightCommission":null,
          "demurrageRate":null,
          "operationTime":null,
          "charterDate":null,
          "option1":null,
          "option2":null,
          "option3":null,
          "allowedLayTimeHours":null,
          "charterer":null,
          "voyageManager":null,
          "shippingCompany":null,
          "maxQuantity":null,
          "minQuantity":null,
          "madeBy":null, 
          "verified":null,
          "captain":null
        
      
    });

    return this.serviceNomination.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "nominationId":null,
          "vesselName":null,
          "IMONumber":null,
          "voyageNumber":null,
          "departure":null,
          "destination":null,
          "ETA":null,
          "cargoName":null,
          "cargoQuantity":null,
          "cargoType":null,
          "operationType":null,
          "nominatedQuantity":null,
          "wscFlat":null,
          "wscPercent":null,
          "overageRate":null,
          "freightCommission":null,
          "demurrageRate":null,
          "operationTime":null,
          "charterDate":null,
          "option1":null,
          "option2":null,
          "option3":null,
          "allowedLayTimeHours":null,
          "charterer":null,
          "voyageManager":null,
          "shippingCompany":null,
          "maxQuantity":null,
          "minQuantity":null,
          "madeBy":null,
          "verified":null,
          "captain":null
        
      
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
    var freightOption1 = {$class: "firstcoin.shipping.FreightOption",
    "rate":this.option1.value
    }
    var freightOption2 = {$class: "firstcoin.shipping.FreightOption",
        "rate":this.option2.value
    }
    var freightOption3 = {$class: "firstcoin.shipping.FreightOption",
        "rate":this.option3.value
    }
    var cargoItem = [{
      $class: "firstcoin.shipping.CargoItem",
      "name":this.cargoName.value,
      "quantity":this.cargoQuantity.value,
      "cargoType": this.cargoType.value
    }];

    this.asset = {
      
      $class: "firstcoin.shipping.Nomination",
      
        
            "vesselName":this.vesselName.value,
            "IMONumber":this.IMONumber.value,
            "voyageNumber":this.voyageNumber.value,
            "departure":this.departure.value,
            "destination":this.destination.value,
            "ETA":this.ETA.value,
            "cargo":cargoItem,
            "operationType":this.operationType.value,
            "nominatedQuantity":this.nominatedQuantity.value,
            "wscFlat":this.wscFlat.value,
            "wscPercent":this.wscPercent.value,
            "overageRate":this.overageRate.value,
            "freightCommission":this.freightCommission.value,
            "demurrageRate":this.demurrageRate.value,
            "operationTime":this.operationTime.value,
            "charterDate":this.charterDate.value,
            "option1":freightOption1,
            "option2":freightOption2,
            "option3":freightOption3,
            "allowedLayTimeHours":this.allowedLayTimeHours.value,
            "charterer":this.charterer.value,
            "voyageManager":this.voyageManager.value,
            "shippingCompany":this.shippingCompany.value,
            "maxQuantity":this.maxQuantity.value,
            "minQuantity":this.minQuantity.value,
            "madeBy":this.madeBy.value,
            "verified":false,
            "captain":this.captain.value
          
          };

    return this.serviceNomination.updateAsset(form.get("nominationId").value,this.asset)
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

    return this.serviceNomination.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
      this.errorMessage = null;
      // this.searchLoading(this.currentId);
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

  getForm(id: any): Promise<any>{

    return this.serviceNomination.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "nominationId":null,
            "vesselName":null,
            "IMONumber":null,
            "voyageNumber":null,
            "departure":null,
            "destination":null,
            "ETA":null,
            "cargo":null,
            "operationType":null,
            "nominatedQuantity":null,
            "wscFlat":null,
            "wscPercent":null,
            "overageRate":null,
            "freightCommission":null,
            "demurrageRate":null,
            "operationTime":null,
            "charterDate":null,
            "option1":null,
            "option2":null,
            "option3":null,
            "allowedLayTimeHours":null,
            "charterer":null,
            "voyageManager":null,
            "shippingCompany":null,
            "maxQuantity":null,
            "minQuantity":null,
            "madeBy":null,
            "verified":null ,
            "captain":null,

        
      };



      
        if(result.nominationId){
          
            formObject.nominationId = result.nominationId;
          
        }else{
          formObject.nominationId = null;
        }
      
        if(result.vesselName){
          
            formObject.vesselName = result.vesselName;
          
        }else{
          formObject.vesselName = null;
        }
      
        if(result.IMONumber){
          
            formObject.IMONumber = result.IMONumber;
          
        }else{
          formObject.IMONumber = null;
        }
      
        if(result.voyageNumber){
          
            formObject.voyageNumber = result.voyageNumber;
          
        }else{
          formObject.voyageNumber = null;
        }
      
        if(result.departure){
          
            formObject.departure = result.departure;
          
        }else{
          formObject.departure = null;
        }
      
        if(result.destination){
          
            formObject.destination = result.destination;
          
        }else{
          formObject.destination = null;
        }
      
        if(result.ETA){
          
            formObject.ETA = result.ETA;
          
        }else{
          formObject.ETA = null;
        }
      
        if(result.cargo){
          
            formObject.cargo = result.cargo;
          
        }else{
          formObject.cargo = null;
        }
      
        if(result.operationType){
          
            formObject.operationType = result.operationType;
          
        }else{
          formObject.operationType = null;
        }
      
        if(result.nominatedQuantity){
          
            formObject.nominatedQuantity = result.nominatedQuantity;
          
        }else{
          formObject.nominatedQuantity = null;
        }
      
        if(result.wscFlat){
          
            formObject.wscFlat = result.wscFlat;
          
        }else{
          formObject.wscFlat = null;
        }
      
        if(result.wscPercent){
          
            formObject.wscPercent = result.wscPercent;
          
        }else{
          formObject.wscPercent = null;
        }
      
        if(result.overageRate){
          
            formObject.overageRate = result.overageRate;
          
        }else{
          formObject.overageRate = null;
        }
      
        if(result.freightCommission){
          
            formObject.freightCommission = result.freightCommission;
          
        }else{
          formObject.freightCommission = null;
        }
      
        if(result.demurrageRate){
          
            formObject.demurrageRate = result.demurrageRate;
          
        }else{
          formObject.demurrageRate = null;
        }
      
        if(result.operationTime){
          
            formObject.operationTime = result.operationTime;
          
        }else{
          formObject.operationTime = null;
        }
      
        if(result.charterDate){
          
            formObject.charterDate = result.charterDate;
          
        }else{
          formObject.charterDate = null;
        }
      
        if(result.option1){
          
            formObject.option1 = result.option1.rate;
          
        }else{
          formObject.option1 = null;
        }
      
        if(result.option2){
          
            formObject.option2 = result.option2.rate;
          
        }else{
          formObject.option2 = null;
        }
      
        if(result.option3){
          
            formObject.option3 = result.option3.rate;
          
        }else{
          formObject.option3 = null;
        }
      
        if(result.allowedLayTimeHours){
          
            formObject.allowedLayTimeHours = result.allowedLayTimeHours;
          
        }else{
          formObject.allowedLayTimeHours = null;
        }
      
        if(result.charterer){
          
            formObject.charterer = result.charterer;
          
        }else{
          formObject.charterer = null;
        }
      
        if(result.voyageManager){
          
            formObject.voyageManager = result.voyageManager;
          
        }else{
          formObject.voyageManager = null;
        }
      
        if(result.shippingCompany){
          
            formObject.shippingCompany = result.shippingCompany;
          
        }else{
          formObject.shippingCompany = null;
        }
      
        if(result.maxQuantity){
          
            formObject.maxQuantity = result.maxQuantity;
          
        }else{
          formObject.maxQuantity = null;
        }
      
        if(result.minQuantity){
          
            formObject.minQuantity = result.minQuantity;
          
        }else{
          formObject.minQuantity = null;
        }
      
        if(result.madeBy){
          
            formObject.madeBy = result.madeBy;
          
        }else{
          formObject.madeBy = null;
        }
      
        if(result.verified){
          
            formObject.verified = result.verified;
          
        }else{
          formObject.verified = null;
        }

        if(result.captain){
          
          formObject.captain = result.captain;
        
		    }else{
		      formObject.captain = null;
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

  resetForm(): void{
    this.myForm.setValue({
        
          "nominationId":null,
          "vesselName":null,
          "IMONumber":null,
          "voyageNumber":null,
          "departure":null,
          "destination":null,
          "ETA":null,
          // "cargoName":null,
          // "cargoQuantity":null,
          // "cargoType":null,
          "operationType":null,
          "nominatedQuantity":null,
          "wscFlat":null,
          "wscPercent":null,
          "overageRate":null,
          "freightCommission":null,
          "demurrageRate":null,
          "operationTime":null,
          "charterDate":null,
          "option1":null,
          "option2":null,
          "option3":null,
          "allowedLayTimeHours":null,
          "charterer":null,
          "voyageManager":null,
          "shippingCompany":null,
          "maxQuantity":null,
          "minQuantity":null,
          "madeBy":null,
          "verified":null,
          "captain":null
        
      });
  }

  /**
   * Function to determine if a nomination has 
   * @param id nominationId
   * @param type type of event
   */
  searchNomination(id: any, type: any): Promise<any> {
    if (type == 1) {
      console.log("LOADING TYPE");
    } else {
      console.log("DISCHARGING TYPE");
    }
    return this.serviceNomination.getAsset(id)
    .toPromise()
    .then((result) => {
      if (type == 1) {
        if (result.loadingCreated) {
          this.routeLoading(id);
        } else {
          this.addLoadingAsset(id ,result);
        }
      } else {
        if (result.dischargeCreated) {
          this.routeDischarging(id);
        } else {
          this.addDischargingAsset(id, result);
        }
      }
    })
    .catch((error) => {
      if(error == 'Server error'){
        this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      }
      else {
        this.errorMessage = error;
      }
    });
  }

  /* Click on Loading button and it will auto generate data to Loading page from Nomination page */
	addLoadingAsset(id: any, obj: any): Promise<any> {
    var random = Math.floor((Math.random() * 1000) + 1);
    var loading = { 
      $class: "firstcoin.shipping.Loading",
      "loadingId": random,
      "nomination": "resource:firstcoin.shipping.Nomination#" + id,
      "NORTendered": null,
      "documentOnBoard": null,
      "BLQuantity": 0
    };

    // let nomIdPass = id;

		return this.serviceLoading.addAsset(loading)
		.toPromise()
		.then((result) => {
      // this.routeLoading(id);
      this.updateNominationAssetLoad(id, obj);
		})
		.catch((error) => {
			if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else {
				this.errorMessage = error;
			}
		});
  }

  /**
   * Function to update loadingDone to true in nomination object
   * @param obj nominationObj
   */
  updateNominationAssetLoad(id: any, obj: any): Promise<any> {
     var nomAsset  = {
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
      "loadingCreated": true,
      "dischargeCreated": obj.dischargeCreated,
      "loadingDone":obj.loadingDone,
      "dischargeDone": obj.dischargeDone
    };
    console.log(nomAsset);
    return this.serviceNomination.updateAsset(id, nomAsset)
    .toPromise()
    .then((result) => {
      console.log("UPDATE SUCCESS");
      this.routeLoading(id);
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
  
  /* Click on Discharge button and it will auto generate data to Discharge page from Nomination page */
  addDischargingAsset(id: any, obj: any): Promise<any> {
    var random = Math.floor((Math.random() * 1000) + 1);
    var discharge = { 
      $class: "firstcoin.shipping.Discharge",
      "dischargeId": random,
      "nomination": "resource:firstcoin.shipping.Nomination#" + id,
      "hoseConnected": null,
      "hoseDisonnected": null
    };

		return this.serviceDischarging.addAsset(discharge)
		.toPromise()
		.then((result) => {
      // this.routeDischarging(id);
      this.updateNominationAssetDischarge(id, obj);
		})
		.catch((error) => {
			if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else {
				this.errorMessage = error;
			}
		});
  }

  /**
   * Function to update loadingDone to true in nomination object
   * @param obj nominationObj
   */
  updateNominationAssetDischarge(id: any, obj: any): Promise<any> {
    var nomAsset  = {
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
      "loadingCreated": obj.loadingCreated,
      "dischargeCreated": true,
      "loadingDone":obj.loadingDone,
      "dischargeDone": obj.dischargeDone
   };
   console.log(nomAsset);
   return this.serviceNomination.updateAsset(id, nomAsset)
   .toPromise()
   .then((result) => {
     console.log("UPDATE SUCCESS");
     this.routeDischarging(id);
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
   * Function to pass the nominationId to loading page
   * @param id nominationId
   */
  routeLoading(id: any): void {
    let nomIdPass = id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "nomIdPass": id
      }
    };
    this.router.navigate(['/Loading'], navigationExtras);
  }

  /**
   * Function to pass the nominationId to discharging page
   * @param id nominationId
   */
  routeDischarging(id: any): void {
    let nomIdPass = id;
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "nomIdPass": id
      }
    };
    this.router.navigate(['/Discharge'], navigationExtras);
  }

  /**
   * Function that uses the nominationId to grab the captain associated with that nomination
   * @param id nominationId
   */
  captainVerify(id: any): Promise<any> {
    console.log("nominationid: " + id);
    return this.serviceNomination.selectNomination(id)
    .toPromise()
    .then((result) => {
      let capId = result[0].captain;
      this.routeCaptain(capId);
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
   * Function to pass the captainId to captainapp page
   * @param id captainId
   */
  routeCaptain(form: any): void {
    // let capIdString = id.split("#");
    // let capIdNum = capIdString[1];
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "capIdPass": this.captainId.value
      }
    };
    this.router.navigate(['/CaptainApp'], navigationExtras);
  }

  /**
   * Function to make generate invoices transaction
   * @param id nominationId
   */
  generateInvoices(): Promise<any> {
    let nomIdString = "resource:firstcoin.shipping.Nomination#" + this.nomId;
    var transaction = {
      $class: "firstcoin.shipping.FinalizeNomination",
      "nomination":nomIdString,
      "transactionId":"",
      "timestamp":Date.now()
    };
    console.log(transaction);
    return this.serviceFinalize.addTransaction(transaction)
    .toPromise()
    .then((result) => {
      console.log(result);
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
   * Function to pass the cargo object of that nomination to the modal
   * @param item cargo object
   */
  displayCargoItems(item: any): void {
    this.allCargoItems = item;
  }

  /**
   * Function to temporarily save the nominationId to be passed into generateInvoices()
   * @param id nominationId
   */
  saveNomId(id: any): void {
    this.nomId = id;
  }

  /**
   * Function to temporary save details from nomination modal
   * @param form myForm
   */
  saveNomInfo(form: any): void {
    this.nomAsset = form;
  }

  /**
   * Function to save cargo items and push to array
   * @param form Form3
   */
  saveCargoItem(form: any): void {
    var item = {
      $class: "firstcoin.shipping.CargoItem",
      "name":this.cargoName.value,
      "quantity":this.cargoQuantity.value,
      "cargoType":this.cargoType.value
    };

    this.cargoItemList.push(item);
    if (this.cargoItemList.length == 2) {
      this.scrollCargoItems(1, 0);
    }
    console.log(this.cargoItemList);
  }

  /**
   * Function to reset the list of cargo items
   */
  resetCargoForm(): void {
    this.Form3.controls['cargoName'].setValue("");
    this.Form3.controls['cargoQuantity'].setValue("");
    this.Form3.controls['cargoType'].setValue("");
  }

  /**
   * Function for scrolling through cargo items
   * @param type 1 for next, 2 for previous
   * @param inc increment, if 1 then increment counter; if 0 then don't
   */
  scrollCargoItems(type: any, inc: any): void {
    if (this.scrollCounter < 0) {
      this.scrollCounter = 0;
    }

    if (type == 1 && inc == 1) {
      this.scrollCounter++;   
    } 
    if (type == 2 && inc == 1) {
      this.scrollCounter--;   
    }

    if (this.scrollCounter < this.cargoItemList.length - 1 && this.scrollCounter > 0) {
      this.scrollMax = true;
      this.scrollMin = true;
    } else if (this.scrollCounter >= this.cargoItemList.length - 1) {
      this.scrollMax = false;
      this.scrollMin = true;
    } else if (this.scrollCounter == 0) {
      this.scrollMax = true;
      this.scrollMin = false;
    } else {
      this.scrollMax = false;
      this.scrollMin = false;
    }
    this.Form3.controls['cargoName'].setValue(this.cargoItemList[this.scrollCounter].name);
    this.Form3.controls['cargoQuantity'].setValue(this.cargoItemList[this.scrollCounter].quantity);
    this.Form3.controls['cargoType'].setValue(this.cargoItemList[this.scrollCounter].cargoType);
  }

  /**
   * Function to add nomination asset
   */
  addNomAsset(): Promise<any> {
    var freightOption1 = {
      $class: "firstcoin.shipping.FreightOption",
      "rate":this.nomAsset._value.option1
    }
    var freightOption2 = {
      $class: "firstcoin.shipping.FreightOption",
      "rate":this.nomAsset._value.option2
    }
    var freightOption3 = {
      $class: "firstcoin.shipping.FreightOption",
      "rate":this.nomAsset._value.option3
    }

    var nomAssetComplete = {
      $class: "firstcoin.shipping.Nomination",
      "nominationId":this.nomAsset._value.nominationId,
      "vesselName":this.nomAsset._value.vesselName,
      "IMONumber":this.nomAsset._value.IMONumber,
      "voyageNumber":this.nomAsset._value.voyageNumber,
      "departure":this.nomAsset._value.departure,
      "destination":this.nomAsset._value.destination,
      "ETA":this.nomAsset._value.ETA,
      "cargo": this.cargoItemList,
      "operationType":this.nomAsset._value.operationType,
      "nominatedQuantity":this.nomAsset._value.nominatedQuantity,
      "wscFlat":this.nomAsset._value.wscFlat,
      "wscPercent":this.nomAsset._value.wscPercent,
      "overageRate":this.nomAsset._value.overageRate,
      "freightCommission":this.nomAsset._value.freightCommission,
      "demurrageRate":this.nomAsset._value.demurrageRate,
      "operationTime":this.nomAsset._value.operationTime,
      "charterDate":this.nomAsset._value.charterDate,
      "option1":freightOption1,
      "option2":freightOption2,
      "option3":freightOption3,
      "allowedLayTimeHours":this.nomAsset._value.allowedLayTimeHours,
      "charterer":this.nomAsset._value.charterer,
      "voyageManager":this.nomAsset._value.voyageManager,
      "shippingCompany":this.nomAsset._value.shippingCompany,
      "maxQuantity":this.nomAsset._value.maxQuantity,
      "minQuantity":this.nomAsset._value.minQuantity,
      "madeBy":this.nomAsset._value.madeBy,
      "verified":false,
      "captain":this.nomAsset._value.captain
    };

    return this.serviceNomination.addAsset(nomAssetComplete)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
      
        
          "nominationId":null,
          "vesselName":null,
          "IMONumber":null,
          "voyageNumber":null,
          "departure":null,
          "destination":null,
          "ETA":null,
          "cargoName":null,
          "cargoQuantity":null,
          "cargoType":null,
          "operationType":null,
          "nominatedQuantity":null,
          "wscFlat":null,
          "wscPercent":null,
          "overageRate":null,
          "freightCommission":null,
          "demurrageRate":null,
          "operationTime":null,
          "charterDate":null,
          "option1":null,
          "option2":null,
          "option3":null,
          "allowedLayTimeHours":null,
          "charterer":null,
          "voyageManager":null,
          "shippingCompany":null,
          "maxQuantity":null,
          "minQuantity":null,
          "madeBy":null,
          "verified":null,
          "captain":null
        
      
      });
      this.Form3.setValue({
        "cargoName":null,
        "cargoQuantity":null,
        "cargoType":null
      });
      this.cargoItemList = [];
      this.scrollCounter = 0;
      this.scrollMax = false;
      this.scrollMin = false;
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

  /* Checks to see if BLQuantity was passed into console */
	getNomIdForLoading (id : any): Promise<any> {
    console.log("hi");
    return this.serviceLoading.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {

          "loadingId":null,
       /* "nomination":"resource:firstcoin.shipping.Nomination#" + id, */
        "nomination":null,
          "NORTendered":null,
          "documentsOnBoard":null,
          "BLQuantity":null
       };

	    console.log("hi");
      if(result.loadingId){
        formObject.loadingId = result.loadingId;
        console.log("loadingId");
      } else {
        formObject.loadingId = null;
      }

      if(result.nomination){
        formObject.nomination = result.nomination;
        console.log("nomination");
      } else {
        formObject.nomination = null;
      }

      if(result.NORTendered){
        formObject.NORTendered = result.NORTendered;
        console.log("NORTendered");
      } else {
        formObject.NORTendered = null;
      }

      if(result.documentsOnBoard){
        formObject.documentsOnBoard = result.documentsOnBoard;
        console.log("documentsOnBoard");
      } else {
        formObject.documentsOnBoard = null;
      }

      if(result.BLQuantity){
        formObject.BLQuantity = result.BLQuantity;
        console.log("BLQuantity");
      } else {
        formObject.BLQuantity = null;
      }
      debugger;
      this.Form2.setValue(formObject);
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

}
