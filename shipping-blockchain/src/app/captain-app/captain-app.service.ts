import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Nomination, Verification } from '../firstcoin.shipping';
import 'rxjs/Rx';

@Injectable()
export class CaptainAppService {

  private NAMESPACE: string = 'firstcoin.shipping.Nomination';
  private QUERYNAMESPACE: string = 'queries/SelectNominationByCaptain?id=';
	



    constructor(private dataService: DataService<Nomination>, private dataService2: DataService<Verification>) {
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

    public queryNominations(id: any): Observable<Nomination[]> {
      return this.dataService.queryNomination(this.QUERYNAMESPACE, id);
    }

}
