import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Auction} from '../../shared/models/auction.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Bid} from './bid.model';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient, private socket: Socket) { }

  public getAllAuctions(): Observable<Auction[]>{
    return this.http.get<Auction[]>(environment.REST_URL + '/auction');
  }
  public getSelectedAuction(auctionId: string): Observable<Auction> {
    return this.http.get<Auction>(environment.REST_URL + '/auction/' + auctionId);
  }

  public listenForBids(): Observable<Bid[]> {
    return this.socket
      .fromEvent<Bid[]>('listen-for-bids');
  }

  public switchChannel(channelId: string): void {
    this.socket.emit('switch-channel', channelId);
  }
}
