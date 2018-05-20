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
import { LoadingService } from './Loading.service';
import 'rxjs/add/operator/toPromise';
import { SetLoadingNORTemperedTimestampService } from '../SetLoadingNORTemperedTimestamp/SetLoadingNORTemperedTimestamp.service';
import { SetLoadingDocumentsOnBoardTimestampService } from '../SetLoadingDocumentsOnBoardTimestamp/SetLoadingDocumentsOnBoardTimestamp.service';
import { NominationService } from '../Nomination/Nomination.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-Loading',
	templateUrl: './Loading.component.html',
	styleUrls: ['./Loading.component.css'],
  providers: [LoadingService,SetLoadingNORTemperedTimestampService, SetLoadingDocumentsOnBoardTimestampService, NominationService]
})
export class LoadingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private nominationObj;
  private nomId;
  private nomId2;    
  loadingId = new FormControl("", Validators.required);
  nomination = new FormControl("", Validators.required);
  NORTendered = new FormControl("", Validators.required);
  documentsOnBoard = new FormControl("", Validators.required);
  BLQuantity = new FormControl("", Validators.required);
  


  constructor(private serviceLoading:LoadingService, 
    private serviceNorTimestamp:SetLoadingNORTemperedTimestampService, 
    private serviceSetLoadingDocumentsOnBoardTimestampService: SetLoadingDocumentsOnBoardTimestampService, 
    private serviceNomination: NominationService,
    fb: FormBuilder,
    private route:ActivatedRoute) {
    this.myForm = fb.group({

          loadingId:this.loadingId,
          nomination:this.nomination,
          NORTendered:this.NORTendered,
          documentsOnBoard:this.documentsOnBoard,
          BLQuantity:this.BLQuantity
        
    
    });

    this.route.queryParams.subscribe(params => {
      this.nomId2 = params["nomIdPass"];
    });
  };

  ngOnInit(): void {
    this.loadSelected(this.nomId2);
  }

  // loadAll(): Promise<any> {
  //   let tempList = [];
  //   return this.serviceLoading.getAll()
  //   .toPromise()
  //   .then((result) => {
  //     this.errorMessage = null;
  //     result.forEach(asset => {
  //       tempList.push(asset);
  //     });
  //     this.allAssets = tempList;
  //   })
  //   .catch((error) => {
  //       if(error == 'Server error'){
  //           this.errorMessage = "Could not connect to REST server. Please check your configuration details";
  //       }
  //       else if(error == '404 - Not Found'){
	// 			this.errorMessage = "404 - Could not find API route. Please check your available APIs."
  //       }
  //       else{
  //           this.errorMessage = error;
  //       }
  //   });
  // }

  /**
   * Function to load all loading assets associated with a specific nomination asset
   * @param id nominationId
   */
  loadSelected(id: any): Promise<any> {
    let tempList = [];
    return this.serviceLoading.queryNominations(id)
    .toPromise()
    .then((result) => {
      console.log("loaded");
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
      $class: "firstcoin.shipping.Loading",
      
        
          "loadingId":this.loadingId.value,
          "nomination":this.nomination.value,
          "NORTendered":this.NORTendered.value,
          "documentsOnBoard":this.documentsOnBoard.value,
          "BLQuantity":this.BLQuantity.value
        
      
    };

    this.myForm.setValue({
      
        
          "loadingId":null,
          "nomination":null,
          "NORTendered":null,
          "documentsOnBoard":null,
          "BLQuantity":null
        
      
    });

    return this.serviceLoading.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "loadingId":null,
          "nomination":null,
          "NORTendered":null,
          "documentsOnBoard":null,
          "BLQuantity":null 
        
      
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
      $class: "firstcoin.shipping.Loading",
      
        
            "nomination":this.nomination.value,
            "NORTendered":this.NORTendered.value,
            "documentsOnBoard":this.documentsOnBoard.value,
            "BLQuantity":this.BLQuantity.value
          
        
    
    };

    return this.serviceLoading.updateAsset(form.get("loadingId").value,this.asset)
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

    return this.serviceLoading.deleteAsset(this.currentId)
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

    return this.serviceLoading.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
            "loadingId":null,
            "nomination":null,
            "NORTendered":null,
            "documentsOnBoard":null,
            "BLQuantity":null 
          
        
      };



      
        if(result.loadingId){
          
            formObject.loadingId = result.loadingId;
          
        }else{
          formObject.loadingId = null;
        }
      
        if(result.nomination){
          
            formObject.nomination = result.nomination;
          
        }else{
          formObject.nomination = null;
        }
      
        if(result.NORTendered){
          
            formObject.NORTendered = result.NORTendered;
          
        }else{
          formObject.NORTendered = null;
        }
      
        if(result.documentsOnBoard){
          
            formObject.documentsOnBoard = result.documentsOnBoard;
          
        }else{
          formObject.documentsOnBoard = null;
        }
      
        if(result.BLQuantity){
          
            formObject.BLQuantity = result.BLQuantity;
          
        }else{
          formObject.BLQuantity = null;
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


  addTransactionNORTendered(id:string): Promise<any> {
    console.log(id);
    var transaction = {    
      $class: "firstcoin.shipping.SetLoadingNORTenderedTimestamp",
      "loading":"resource:firstcoin.shipping.Loading#" + id ,
      "transactionId":"",
      "timestamp": Date.now(),
    };
    return this.serviceNorTimestamp.addTransaction(transaction)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      this.checkLoading(id);
      // window.location.reload();
    })
    .catch((error) => {
      if (error == 'Server error') {
        this.errorMessage = "Could not connect to REST server. Please check your configuration details";
      } else {
        this.errorMessage = error;
      }
    });
  }

  addTransactionDocumentsOnBoard(id:string): Promise<any>{

    var transaction = {    
      $class: "firstcoin.shipping.SetLoadingDocumentsOnBoardTimestamp",
      "loading":"resource:firstcoin.shipping.Loading#" + id ,
      "transactionId":"",
      "timestamp": Date.now()
    };
    return this.serviceSetLoadingDocumentsOnBoardTimestampService.addTransaction(transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.checkLoading(id);
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
  checkLoading(id: any): Promise<any> {
    console.log("checkLoading(" + id+ ")");
    return this.serviceLoading.getAsset(id)
    .toPromise()
    .then((result) => {
      if (!result.documentsOnBoard || !result.NORTendered) {
        console.log("NOR or DOC empty");
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
   * Function to get nomination asset associated with loading asset
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
      "loadingDone":true,
      "dischargeDone": obj.dischargeDone
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
      
        
          "loadingId":null,
          "nomination":null,
          "NORTendered":null,
          "documentsOnBoard":null,
          "BLQuantity":null 
        
      
      });
  }

}
