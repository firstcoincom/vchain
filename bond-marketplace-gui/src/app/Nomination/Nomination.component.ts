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
import { NominationService } from './Nomination.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Nomination',
	templateUrl: './Nomination.component.html',
	styleUrls: ['./Nomination.component.css'],
  providers: [NominationService]
})
export class NominationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          nominationId = new FormControl("", Validators.required);
        
  
      
          vesselName = new FormControl("", Validators.required);
        
  
      
          IMONumber = new FormControl("", Validators.required);
        
  
      
          voyageNumber = new FormControl("", Validators.required);
        
  
      
          departure = new FormControl("", Validators.required);
        
  
      
          destination = new FormControl("", Validators.required);
        
  
      
          ETA = new FormControl("", Validators.required);
        
  
      
          cargo = new FormControl("", Validators.required);
        
  
      
          operationType = new FormControl("", Validators.required);
        
  
      
          nominatedQuantity = new FormControl("", Validators.required);
        
  
      
          wscFlat = new FormControl("", Validators.required);
        
  
      
          wscPercent = new FormControl("", Validators.required);
        
  
      
          overageRate = new FormControl("", Validators.required);
        
  
      
          freightCommission = new FormControl("", Validators.required);
        
  
      
          demurrageRate = new FormControl("", Validators.required);
        
  
      
          operationTime = new FormControl("", Validators.required);
        
  
      
          charterDate = new FormControl("", Validators.required);
        
  
      
          charterer = new FormControl("", Validators.required);
        
  
      
          option1 = new FormControl("", Validators.required);
        
  
      
          option2 = new FormControl("", Validators.required);
        
  
      
          option3 = new FormControl("", Validators.required);
        
  
      
          allowedLayTimeHours = new FormControl("", Validators.required);
        
  
      
          chartererEmail = new FormControl("", Validators.required);
        
  
      
          voyageManagerEmail = new FormControl("", Validators.required);
        
  
      
          shippingCompanyEmail = new FormControl("", Validators.required);
        
  
      
          maxQuantity = new FormControl("", Validators.required);
        
  
      
          minQuantity = new FormControl("", Validators.required);
        
  
      
          madeBy = new FormControl("", Validators.required);
        
  
      
          verified = new FormControl("", Validators.required);
        
  


  constructor(private serviceNomination:NominationService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          nominationId:this.nominationId,
        
    
        
          vesselName:this.vesselName,
        
    
        
          IMONumber:this.IMONumber,
        
    
        
          voyageNumber:this.voyageNumber,
        
    
        
          departure:this.departure,
        
    
        
          destination:this.destination,
        
    
        
          ETA:this.ETA,
        
    
        
          cargo:this.cargo,
        
    
        
          operationType:this.operationType,
        
    
        
          nominatedQuantity:this.nominatedQuantity,
        
    
        
          wscFlat:this.wscFlat,
        
    
        
          wscPercent:this.wscPercent,
        
    
        
          overageRate:this.overageRate,
        
    
        
          freightCommission:this.freightCommission,
        
    
        
          demurrageRate:this.demurrageRate,
        
    
        
          operationTime:this.operationTime,
        
    
        
          charterDate:this.charterDate,
        
    
        
          charterer:this.charterer,
        
    
        
          option1:this.option1,
        
    
        
          option2:this.option2,
        
    
        
          option3:this.option3,
        
    
        
          allowedLayTimeHours:this.allowedLayTimeHours,
        
    
        
          chartererEmail:this.chartererEmail,
        
    
        
          voyageManagerEmail:this.voyageManagerEmail,
        
    
        
          shippingCompanyEmail:this.shippingCompanyEmail,
        
    
        
          maxQuantity:this.maxQuantity,
        
    
        
          minQuantity:this.minQuantity,
        
    
        
          madeBy:this.madeBy,
        
    
        
          verified:this.verified
        
    
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
    this.asset = {
      $class: "firstcoin.shipping.Nomination",
      
        
          "nominationId":this.nominationId.value,
        
      
        
          "vesselName":this.vesselName.value,
        
      
        
          "IMONumber":this.IMONumber.value,
        
      
        
          "voyageNumber":this.voyageNumber.value,
        
      
        
          "departure":this.departure.value,
        
      
        
          "destination":this.destination.value,
        
      
        
          "ETA":this.ETA.value,
        
      
        
          "cargo":this.cargo.value,
        
      
        
          "operationType":this.operationType.value,
        
      
        
          "nominatedQuantity":this.nominatedQuantity.value,
        
      
        
          "wscFlat":this.wscFlat.value,
        
      
        
          "wscPercent":this.wscPercent.value,
        
      
        
          "overageRate":this.overageRate.value,
        
      
        
          "freightCommission":this.freightCommission.value,
        
      
        
          "demurrageRate":this.demurrageRate.value,
        
      
        
          "operationTime":this.operationTime.value,
        
      
        
          "charterDate":this.charterDate.value,
        
      
        
          "charterer":this.charterer.value,
        
      
        
          "option1":this.option1.value,
        
      
        
          "option2":this.option2.value,
        
      
        
          "option3":this.option3.value,
        
      
        
          "allowedLayTimeHours":this.allowedLayTimeHours.value,
        
      
        
          "chartererEmail":this.chartererEmail.value,
        
      
        
          "voyageManagerEmail":this.voyageManagerEmail.value,
        
      
        
          "shippingCompanyEmail":this.shippingCompanyEmail.value,
        
      
        
          "maxQuantity":this.maxQuantity.value,
        
      
        
          "minQuantity":this.minQuantity.value,
        
      
        
          "madeBy":this.madeBy.value,
        
      
        
          "verified":this.verified.value
        
      
    };

    this.myForm.setValue({
      
        
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
        
      
        
          "charterer":null,
        
      
        
          "option1":null,
        
      
        
          "option2":null,
        
      
        
          "option3":null,
        
      
        
          "allowedLayTimeHours":null,
        
      
        
          "chartererEmail":null,
        
      
        
          "voyageManagerEmail":null,
        
      
        
          "shippingCompanyEmail":null,
        
      
        
          "maxQuantity":null,
        
      
        
          "minQuantity":null,
        
      
        
          "madeBy":null,
        
      
        
          "verified":null
        
      
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
        
      
        
          "charterer":null,
        
      
        
          "option1":null,
        
      
        
          "option2":null,
        
      
        
          "option3":null,
        
      
        
          "allowedLayTimeHours":null,
        
      
        
          "chartererEmail":null,
        
      
        
          "voyageManagerEmail":null,
        
      
        
          "shippingCompanyEmail":null,
        
      
        
          "maxQuantity":null,
        
      
        
          "minQuantity":null,
        
      
        
          "madeBy":null,
        
      
        
          "verified":null 
        
      
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
      $class: "firstcoin.shipping.Nomination",
      
        
          
        
    
        
          
            "vesselName":this.vesselName.value,
          
        
    
        
          
            "IMONumber":this.IMONumber.value,
          
        
    
        
          
            "voyageNumber":this.voyageNumber.value,
          
        
    
        
          
            "departure":this.departure.value,
          
        
    
        
          
            "destination":this.destination.value,
          
        
    
        
          
            "ETA":this.ETA.value,
          
        
    
        
          
            "cargo":this.cargo.value,
          
        
    
        
          
            "operationType":this.operationType.value,
          
        
    
        
          
            "nominatedQuantity":this.nominatedQuantity.value,
          
        
    
        
          
            "wscFlat":this.wscFlat.value,
          
        
    
        
          
            "wscPercent":this.wscPercent.value,
          
        
    
        
          
            "overageRate":this.overageRate.value,
          
        
    
        
          
            "freightCommission":this.freightCommission.value,
          
        
    
        
          
            "demurrageRate":this.demurrageRate.value,
          
        
    
        
          
            "operationTime":this.operationTime.value,
          
        
    
        
          
            "charterDate":this.charterDate.value,
          
        
    
        
          
            "charterer":this.charterer.value,
          
        
    
        
          
            "option1":this.option1.value,
          
        
    
        
          
            "option2":this.option2.value,
          
        
    
        
          
            "option3":this.option3.value,
          
        
    
        
          
            "allowedLayTimeHours":this.allowedLayTimeHours.value,
          
        
    
        
          
            "chartererEmail":this.chartererEmail.value,
          
        
    
        
          
            "voyageManagerEmail":this.voyageManagerEmail.value,
          
        
    
        
          
            "shippingCompanyEmail":this.shippingCompanyEmail.value,
          
        
    
        
          
            "maxQuantity":this.maxQuantity.value,
          
        
    
        
          
            "minQuantity":this.minQuantity.value,
          
        
    
        
          
            "madeBy":this.madeBy.value,
          
        
    
        
          
            "verified":this.verified.value
          
        
    
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
          
        
          
            "charterer":null,
          
        
          
            "option1":null,
          
        
          
            "option2":null,
          
        
          
            "option3":null,
          
        
          
            "allowedLayTimeHours":null,
          
        
          
            "chartererEmail":null,
          
        
          
            "voyageManagerEmail":null,
          
        
          
            "shippingCompanyEmail":null,
          
        
          
            "maxQuantity":null,
          
        
          
            "minQuantity":null,
          
        
          
            "madeBy":null,
          
        
          
            "verified":null 
          
        
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
      
        if(result.charterer){
          
            formObject.charterer = result.charterer;
          
        }else{
          formObject.charterer = null;
        }
      
        if(result.option1){
          
            formObject.option1 = result.option1;
          
        }else{
          formObject.option1 = null;
        }
      
        if(result.option2){
          
            formObject.option2 = result.option2;
          
        }else{
          formObject.option2 = null;
        }
      
        if(result.option3){
          
            formObject.option3 = result.option3;
          
        }else{
          formObject.option3 = null;
        }
      
        if(result.allowedLayTimeHours){
          
            formObject.allowedLayTimeHours = result.allowedLayTimeHours;
          
        }else{
          formObject.allowedLayTimeHours = null;
        }
      
        if(result.chartererEmail){
          
            formObject.chartererEmail = result.chartererEmail;
          
        }else{
          formObject.chartererEmail = null;
        }
      
        if(result.voyageManagerEmail){
          
            formObject.voyageManagerEmail = result.voyageManagerEmail;
          
        }else{
          formObject.voyageManagerEmail = null;
        }
      
        if(result.shippingCompanyEmail){
          
            formObject.shippingCompanyEmail = result.shippingCompanyEmail;
          
        }else{
          formObject.shippingCompanyEmail = null;
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
        
      
        
          "charterer":null,
        
      
        
          "option1":null,
        
      
        
          "option2":null,
        
      
        
          "option3":null,
        
      
        
          "allowedLayTimeHours":null,
        
      
        
          "chartererEmail":null,
        
      
        
          "voyageManagerEmail":null,
        
      
        
          "shippingCompanyEmail":null,
        
      
        
          "maxQuantity":null,
        
      
        
          "minQuantity":null,
        
      
        
          "madeBy":null,
        
      
        
          "verified":null 
        
      
      });
  }

}