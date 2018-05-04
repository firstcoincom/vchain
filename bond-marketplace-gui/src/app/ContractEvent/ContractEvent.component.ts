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
import { ContractEventService } from './ContractEvent.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ContractEvent',
	templateUrl: './ContractEvent.component.html',
	styleUrls: ['./ContractEvent.component.css'],
  providers: [ContractEventService]
})
export class ContractEventComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          eventId = new FormControl("", Validators.required);
        
  
      
          contract = new FormControl("", Validators.required);
        
  
      
          creator = new FormControl("", Validators.required);
        
  
      
          type = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceContractEvent:ContractEventService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          eventId:this.eventId,
        
    
        
          contract:this.contract,
        
    
        
          creator:this.creator,
        
    
        
          type:this.type,
        
    
        
          description:this.description,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceContractEvent.getAll()
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
      $class: "firstcoin.shipping.ContractEvent",
      
        
          "eventId":this.eventId.value,
        
      
        
          "contract":this.contract.value,
        
      
        
          "creator":this.creator.value,
        
      
        
          "type":this.type.value,
        
      
        
          "description":this.description.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "eventId":null,
        
      
        
          "contract":null,
        
      
        
          "creator":null,
        
      
        
          "type":null,
        
      
        
          "description":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceContractEvent.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "eventId":null,
        
      
        
          "contract":null,
        
      
        
          "creator":null,
        
      
        
          "type":null,
        
      
        
          "description":null,
        
      
        
          "timestamp":null 
        
      
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
      $class: "firstcoin.shipping.ContractEvent",
      
        
          
        
    
        
          
            "contract":this.contract.value,
          
        
    
        
          
            "creator":this.creator.value,
          
        
    
        
          
            "type":this.type.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceContractEvent.updateAsset(form.get("eventId").value,this.asset)
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

    return this.serviceContractEvent.deleteAsset(this.currentId)
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

    return this.serviceContractEvent.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "eventId":null,
          
        
          
            "contract":null,
          
        
          
            "creator":null,
          
        
          
            "type":null,
          
        
          
            "description":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.eventId){
          
            formObject.eventId = result.eventId;
          
        }else{
          formObject.eventId = null;
        }
      
        if(result.contract){
          
            formObject.contract = result.contract;
          
        }else{
          formObject.contract = null;
        }
      
        if(result.creator){
          
            formObject.creator = result.creator;
          
        }else{
          formObject.creator = null;
        }
      
        if(result.type){
          
            formObject.type = result.type;
          
        }else{
          formObject.type = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
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
      
        
          "eventId":null,
        
      
        
          "contract":null,
        
      
        
          "creator":null,
        
      
        
          "type":null,
        
      
        
          "description":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}
