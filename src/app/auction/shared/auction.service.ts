import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Auction} from '../../shared/models/auction.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Bid} from './bid.model';
import {Socket} from 'ngx-socket-io';
import {ListenForBidsDto} from './listenForBids.dto';
import {AddBidDTO} from './addBid.dto';

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

  public listenForBids(): Observable<ListenForBidsDto> {
    return this.socket
      .fromEvent<ListenForBidsDto>('listen-for-bids');
  }

  public addBid(value: number, bidderId: string, auctionId: string): void{
    const dto: AddBidDTO = {value, bidderId, auctionId};
    this.socket.emit('add-bid', dto);
  }

  public switchChannel(channelId: string): void {
    this.socket.emit('switch-channel', channelId);
  }
}
