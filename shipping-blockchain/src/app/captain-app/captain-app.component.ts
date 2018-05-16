import { Component, OnInit } from '@angular/core';
import { CaptainAppService } from './captain-app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VerificationService } from '../Verification/Verification.service';
import { Verification } from '../firstcoin.shipping';
import { Transaction } from '../org.hyperledger.composer.system';
@Component({
  selector: 'app-captain-app',
  templateUrl: './captain-app.component.html',
  styleUrls: ['./captain-app.component.css'],
  providers: [CaptainAppService, VerificationService]
})
export class CaptainAppComponent implements OnInit {
  myForm: FormGroup;

  private allAssets;
  private asset;
  private captainIdString;
  private nominationIdString;
  private madeBy;
  private errorMessage;
  captainId = new FormControl("", Validators.required);
  vesselName = new FormControl("", Validators.required);
  IMONumber = new FormControl("", Validators.required);
  voyageNumber = new FormControl("", Validators.required);
  verified = new FormControl("", Validators.required);

  constructor(private serviceNomination:CaptainAppService, private serviceVerification:VerificationService, fb: FormBuilder) {  
    this.myForm = fb.group({
      captainId:this.captainId, 
      vesselName:this.vesselName,
      IMONumber:this.IMONumber,
      voyageNumber:this.voyageNumber,
      verified:this.verified
    });
  };

  ngOnInit() {
    this.resetForm();
  }

  /**
   * Function to load all nominations based on captain's id
   */
  loadAll(form: any): Promise<any> {
    let tempList = [];
    this.captainIdString = this.captainId.value;
    let capString = "resource:firstcoin.shipping.Captain%23CAP-" + this.captainIdString;
    console.log(capString); 
    return this.serviceNomination.queryNominations(capString)
    .toPromise()
    .then((result) => {
      console.log(result);
      result.forEach(asset => {
          tempList.push(asset);
      });
      this.allAssets = tempList;
      if (!this.allAssets) {
        this.errorMessage = "ASSET LIST EMPTY";
      }
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
   * Function to find a specific nomination based on nomination id passed from form (not used right now)
   */
  findNomination(form: any): Promise<any> {
    let tempList = [];
    this.captainIdString = this.captainId.value;
    console.log(this.captainId.value);
    return this.serviceNomination.getAsset(this.captainId.value)
    .toPromise()
    .then((result) => {
      tempList.push(result);
      this.madeBy = result.madeBy;
      this.allAssets = tempList;
      if (!this.allAssets) {
        this.errorMessage = "ASSET LIST EMPTY";
      }
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
   * Function to set the nomination id based on which nomination you click to verify
   * @param id nominationId
   */
  setNomination(id: any): void {
    this.nominationIdString = id;
    console.log(this.nominationIdString);
  }

  /**
   * Function to add transaction which is called from findNomination
   */
  addTransaction(id: any): Promise<any> {
    let captain = "resource:firstcoin.shipping.Captain#CAP-" + this.captainIdString;
    var transaction = {
      $class: "firstcoin.shipping.Verification",
      "nomination": "resource:firstcoin.shipping.Nomination#" + this.nominationIdString,
      "verified": true,
      "verifiedBy": captain,
      "transactionId": "",
      "timestamp": Date.now()
    };
    return this.serviceVerification.addTransaction(transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      window.location.reload();
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
   * Funciton to reset the form
   */
  resetForm(): void{
    this.myForm.setValue({
      
        
          "captainId":null,
        
      
        
          "vesselName":null,
        
      
        
          "IMONumber":null,
        
      
        
          "voyageNumber":null,


          "verified":null

      });
  }
}
