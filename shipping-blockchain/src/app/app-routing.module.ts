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

import { NominationComponent } from './Nomination/Nomination.component';
import { DischargeComponent } from './Discharge/Discharge.component';
import { LoadingComponent } from './Loading/Loading.component';


  import { TerminalComponent } from './Terminal/Terminal.component';
  import { PilotComponent } from './Pilot/Pilot.component';
  import { CaptainComponent } from './Captain/Captain.component';
  import { TowageCompanyComponent } from './TowageCompany/TowageCompany.component';
  import { ShippingCompanyComponent } from './ShippingCompany/ShippingCompany.component';
  import { ChartererComponent } from './Charterer/Charterer.component';
  import { VoyageManagerComponent } from './VoyageManager/VoyageManager.component';


  import { VerificationComponent } from './Verification/Verification.component';
  import { UpdateETAComponent } from './UpdateETA/UpdateETA.component';
  import { SetDischargeConnectTimestampComponent } from './SetDischargeConnectTimestamp/SetDischargeConnectTimestamp.component';
  import { SetDischargeDisconnectTimestampComponent } from './SetDischargeDisconnectTimestamp/SetDischargeDisconnectTimestamp.component';
  import { SetLoadingNORTemperedTimestampComponent } from './SetLoadingNORTemperedTimestamp/SetLoadingNORTemperedTimestamp.component';
  import { SetLoadingDocumentsOnBoardTimestampComponent } from './SetLoadingDocumentsOnBoardTimestamp/SetLoadingDocumentsOnBoardTimestamp.component';
  import { InitializeStuffComponent } from './InitializeStuff/InitializeStuff.component';
  import { FinalizeNominationComponent } from './FinalizeNomination/FinalizeNomination.component';
  import { CreateNominationComponent } from './CreateNomination/CreateNomination.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Nomination', component: NominationComponent},
    
		{ path: 'Discharge', component: DischargeComponent},
    
		{ path: 'Loading', component: LoadingComponent},
    
    
      { path: 'Terminal', component: TerminalComponent},
      
      { path: 'Pilot', component: PilotComponent},
      
      { path: 'Captain', component: CaptainComponent},
      
      { path: 'TowageCompany', component: TowageCompanyComponent},
      
      { path: 'ShippingCompany', component: ShippingCompanyComponent},
      
      { path: 'Charterer', component: ChartererComponent},
      
      { path: 'VoyageManager', component: VoyageManagerComponent},
      
      
        { path: 'Verification', component: VerificationComponent},
        
        { path: 'UpdateETA', component: UpdateETAComponent},
        
        { path: 'SetDischargeConnectTimestamp', component: SetDischargeConnectTimestampComponent},
        
        { path: 'SetDischargeDisconnectTimestamp', component: SetDischargeDisconnectTimestampComponent},
        
        { path: 'SetLoadingNORTemperedTimestamp', component: SetLoadingNORTemperedTimestampComponent},
        
        { path: 'SetLoadingDocumentsOnBoardTimestamp', component: SetLoadingDocumentsOnBoardTimestampComponent},
        
        { path: 'InitializeStuff', component: InitializeStuffComponent},
        
        { path: 'FinalizeNomination', component: FinalizeNominationComponent},
        
        { path: 'CreateNomination', component: CreateNominationComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
