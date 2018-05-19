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

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Nomination } from '../firstcoin.shipping';
import { Loading } from '../firstcoin.shipping';
import { Discharge } from '../firstcoin.shipping';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class NominationService {

	
		private NAMESPACE: string = 'firstcoin.shipping.Nomination';
		private LOADING: string   = 'firstcoin.shipping.Loading';



    constructor(private dataService: DataService<Nomination>, private dataService2: DataService<Loading>) {
    };

    public getAll(): Observable<Nomination[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Nomination> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Nomination> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Nomination> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Nomination> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public addBLQuantity(itemToAdd: any): Observable<Loading> {
      return this.dataService2.add(this.LOADING, itemToAdd);
    }

}
