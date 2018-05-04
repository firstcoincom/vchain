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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

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
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Contract', component: ContractComponent},
    
		{ path: 'Option1', component: Option1Component},
    
		{ path: 'Option2', component: Option2Component},
    
		{ path: 'Option3', component: Option3Component},
    
		{ path: 'ContractEvent', component: ContractEventComponent},
    
		{ path: 'Vessel', component: VesselComponent},
    
    
      { path: 'Terminal', component: TerminalComponent},
      
      { path: 'Pilot', component: PilotComponent},
      
      { path: 'Captain', component: CaptainComponent},
      
      { path: 'TowageCompany', component: TowageCompanyComponent},
      
      { path: 'ShippingCompany', component: ShippingCompanyComponent},
      
      { path: 'Charterer', component: ChartererComponent},
      
      { path: 'VoyageManager', component: VoyageManagerComponent},
      
      
        { path: 'UpdateETA', component: UpdateETAComponent},
        
        { path: 'AddEvent', component: AddEventComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
