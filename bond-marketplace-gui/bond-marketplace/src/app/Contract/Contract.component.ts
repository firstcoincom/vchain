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
import { ContractService } from './Contract.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Contract',
	templateUrl: './Contract.component.html',
	styleUrls: ['./Contract.component.css'],
  providers: [ContractService]
})
export class ContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          contractId = new FormControl("", Validators.required);
        
  
      
          voyageNumber = new FormControl("", Validators.required);
        
  
      
          ETA = new FormControl("", Validators.required);
        
  
      
          cargo = new FormControl("", Validators.required);
        
  
      
          events = new FormControl("", Validators.required);
        
  
      
          vessel = new FormControl("", Validators.required);
        
  
      
          departure = new FormControl("", Validators.required);
        
  
      
          destination = new FormControl("", Validators.required);
        
  
      
          pilot = new FormControl("", Validators.required);
        
  
      
          captain = new FormControl("", Validators.required);
        
  
      
          towageCompany = new FormControl("", Validators.required);
        
  
      
          shippingCompany = new FormControl("", Validators.required);
        
  


  constructor(private serviceContract:ContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          contractId:this.contractId,
        
    
        
          voyageNumber:this.voyageNumber,
        
    
        
          ETA:this.ETA,
        
    
        
          cargo:this.cargo,
        
    
        
          events:this.events,
        
    
        
          vessel:this.vessel,
        
    
        
          departure:this.departure,
        
    
        
          destination:this.destination,
        
    
        
          pilot:this.pilot,
        
    
        
          captain:this.captain,
        
    
        
          towageCompany:this.towageCompany,
        
    
        
          shippingCompany:this.shippingCompany
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceContract.getAll()
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
      $class: "firstcoin.shipping.Contract",
      
        
          "contractId":this.contractId.value,
        
      
        
          "voyageNumber":this.voyageNumber.value,
        
      
        
          "ETA":this.ETA.value,
        
      
        
          "cargo":this.cargo.value,
        
      
        
          "events":this.events.value,
        
      
        
          "vessel":this.vessel.value,
        
      
        
          "departure":this.departure.value,
        
      
        
          "destination":this.destination.value,
        
      
        
          "pilot":this.pilot.value,
        
      
        
          "captain":this.captain.value,
        
      
        
          "towageCompany":this.towageCompany.value,
        
      
        
          "shippingCompany":this.shippingCompany.value
        
      
    };

    this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "voyageNumber":null,
        
      
        
          "ETA":null,
        
      
        
          "cargo":null,
        
      
        
          "events":null,
        
      
        
          "vessel":null,
        
      
        
          "departure":null,
        
      
        
          "destination":null,
        
      
        
          "pilot":null,
        
      
        
          "captain":null,
        
      
        
          "towageCompany":null,
        
      
        
          "shippingCompany":null
        
      
    });

    return this.serviceContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "voyageNumber":null,
        
      
        
          "ETA":null,
        
      
        
          "cargo":null,
        
      
        
          "events":null,
        
      
        
          "vessel":null,
        
      
        
          "departure":null,
        
      
        
          "destination":null,
        
      
        
          "pilot":null,
        
      
        
          "captain":null,
        
      
        
          "towageCompany":null,
        
      
        
          "shippingCompany":null 
        
      
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
      $class: "firstcoin.shipping.Contract",
      
        
          
        
    
        
          
            "voyageNumber":this.voyageNumber.value,
          
        
    
        
          
            "ETA":this.ETA.value,
          
        
    
        
          
            "cargo":this.cargo.value,
          
        
    
        
          
            "events":this.events.value,
          
        
    
        
          
            "vessel":this.vessel.value,
          
        
    
        
          
            "departure":this.departure.value,
          
        
    
        
          
            "destination":this.destination.value,
          
        
    
        
          
            "pilot":this.pilot.value,
          
        
    
        
          
            "captain":this.captain.value,
          
        
    
        
          
            "towageCompany":this.towageCompany.value,
          
        
    
        
          
            "shippingCompany":this.shippingCompany.value
          
        
    
    };

    return this.serviceContract.updateAsset(form.get("contractId").value,this.asset)
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

    return this.serviceContract.deleteAsset(this.currentId)
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

    return this.serviceContract.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "contractId":null,
          
        
          
            "voyageNumber":null,
          
        
          
            "ETA":null,
          
        
          
            "cargo":null,
          
        
          
            "events":null,
          
        
          
            "vessel":null,
          
        
          
            "departure":null,
          
        
          
            "destination":null,
          
        
          
            "pilot":null,
          
        
          
            "captain":null,
          
        
          
            "towageCompany":null,
          
        
          
            "shippingCompany":null 
          
        
      };



      
        if(result.contractId){
          
            formObject.contractId = result.contractId;
          
        }else{
          formObject.contractId = null;
        }
      
        if(result.voyageNumber){
          
            formObject.voyageNumber = result.voyageNumber;
          
        }else{
          formObject.voyageNumber = null;
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
      
        if(result.events){
          
            formObject.events = result.events;
          
        }else{
          formObject.events = null;
        }
      
        if(result.vessel){
          
            formObject.vessel = result.vessel;
          
        }else{
          formObject.vessel = null;
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
      
        if(result.pilot){
          
            formObject.pilot = result.pilot;
          
        }else{
          formObject.pilot = null;
        }
      
        if(result.captain){
          
            formObject.captain = result.captain;
          
        }else{
          formObject.captain = null;
        }
      
        if(result.towageCompany){
          
            formObject.towageCompany = result.towageCompany;
          
        }else{
          formObject.towageCompany = null;
        }
      
        if(result.shippingCompany){
          
            formObject.shippingCompany = result.shippingCompany;
          
        }else{
          formObject.shippingCompany = null;
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
      
        
          "contractId":null,
        
      
        
          "voyageNumber":null,
        
      
        
          "ETA":null,
        
      
        
          "cargo":null,
        
      
        
          "events":null,
        
      
        
          "vessel":null,
        
      
        
          "departure":null,
        
      
        
          "destination":null,
        
      
        
          "pilot":null,
        
      
        
          "captain":null,
        
      
        
          "towageCompany":null,
        
      
        
          "shippingCompany":null 
        
      
      });
  }

}
