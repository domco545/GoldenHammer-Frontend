import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import {AddBid, GetAuction, ListenForBids, StopListeningForBids} from '../state/auction.actions';
import {Observable, Subscription} from 'rxjs';
import { AuctionState } from '../state/auction.state';
import {Auction} from '../../shared/models/auction.model';
import {Bid} from '../shared/bid.model';
import {AuthState} from '../../state/auth.state';
import {FormControl} from '@angular/forms';
import {User} from '../../shared/models/user.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-detail-auction',
  templateUrl: './detail-auction.component.html',
  styleUrls: ['./detail-auction.component.scss']
})
export class DetailAuctionComponent implements OnInit, OnDestroy {
  public auctionId = '';
  @Select(AuctionState.selectedAuction) selectedAuction: Observable<Auction> | undefined;
  @Select(AuctionState.bids) bids$: Observable<Bid[]> | undefined;
  @Select(AuctionState.selectedAuctionPrice) selectedAuctionPrice$: Observable<number> | undefined;
  @Select(AuthState.isAuthenticated) loggedIn$: Observable<boolean> | undefined;
  @Select(AuthState.user) user$: Observable<User> | undefined;
  selectedBid: number | undefined;
  customBidFC = new FormControl('');
  userId: string | undefined;
  sub: Subscription | undefined;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.selectedBid = 1;
    const id = this.activatedRoute.snapshot.paramMap.get('auctionId');
    if (id){
      this.auctionId = id;
      this.store.dispatch([new GetAuction(this.auctionId), new ListenForBids(this.auctionId)]);
    }
    this.sub = this.user$?.subscribe(data => this.userId = data.id);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForBids());
    this.sub?.unsubscribe();
  }

  changeSelectedBid(option: number): void{
    this.selectedBid = option;
  }

  placeBid(amount: number): void{
    if (this.userId && this.auctionId){
      this.store.dispatch(new AddBid(amount, this.userId, this.auctionId));
    }
  }

  sendBid(): void{
    switch (this.selectedBid) {
      case 1: {
        this.placeBid(50);
        break;
      }
      case 2: {
        this.placeBid(100);
        break;
      }
      case 3: {
        this.placeBid(1000);
        break;
      }
      case 4: {
        const form: number = Number(this.customBidFC.value);
        if (form > 0){
          this.placeBid(form);
        }
        break;
      }
    }
  }
}
