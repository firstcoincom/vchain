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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { ContractComponent } from './Contract/Contract.component';
import { Option1Component } from './Option1/Option1.component';
import { Option2Component } from './Option2/Option2.component';
import { Option3Component } from './Option3/Option3.component';
import { ContractEventComponent } from './ContractEvent/ContractEvent.component';
import { VesselComponent } from './Vessel/Vessel.component';


  import { TerminalComponent } from './Terminal/Terminal.component';
  import { PilotComponent } from './Pilot/Pilot.component';
  import { CaptainComponent } from './Captain/Captain.component';
  import { TowageCompanyComponent } from './TowageCompany/TowageCompany.component';
  import { ShippingCompanyComponent } from './ShippingCompany/ShippingCompany.component';
  import { ChartererComponent } from './Charterer/Charterer.component';
  import { VoyageManagerComponent } from './VoyageManager/VoyageManager.component';


  import { UpdateETAComponent } from './UpdateETA/UpdateETA.component';
  import { AddEventComponent } from './AddEvent/AddEvent.component';
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    ContractComponent,
    Option1Component,
    Option2Component,
    Option3Component,
    ContractEventComponent,
    
    VesselComponent
    ,

    TerminalComponent,
      PilotComponent,
      CaptainComponent,
      TowageCompanyComponent,
      ShippingCompanyComponent,
      ChartererComponent,
      
      VoyageManagerComponent
      ,

    UpdateETAComponent,
        
        AddEventComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
