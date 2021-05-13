import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Auction} from '../../shared/auction.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  public getAllAuctions(): Observable<Auction[]>{
    return this.http.get<Auction[]>(environment.REST_URL + '/auction');
  }
}
