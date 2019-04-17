import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { HeroInt } from '../heroInterface';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable({
  // declare that this service should be created by the root application injector.
  providedIn: 'root'
})

export class HeroDataService {
  Data: any;
  constructor(private httpClient: HttpClient) {
  }
  getHeroes(): Observable<any> {
    return this.httpClient.get<any>('../assets/Heroes.json');
  }
  getLinkInfo(): Observable<any> {
    return this.httpClient.get<any>('../assets/infoLink.json');
  }
  getLoremIpsum(url: string): Observable<any> {
    console.log(url);
    return this.httpClient.get<any>(url);
  }

  getRData(url: string): Observable<any> {
    console.log(url);
    return this.httpClient.get<any>(url);
  }
}
