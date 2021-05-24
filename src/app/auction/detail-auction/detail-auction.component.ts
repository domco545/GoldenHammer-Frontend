import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import {GetAuction, ListenForBids, StopListeningForBids} from '../state/auction.actions';
import { Observable } from 'rxjs';
import { AuctionState } from '../state/auction.state';
import {Auction} from '../../shared/models/auction.model';
import {Bid} from '../shared/bid.model';

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

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('auctionId');
    if (id){
      this.auctionId = id;
      this.store.dispatch([new GetAuction(this.auctionId), new ListenForBids(this.auctionId)]);
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForBids());
  }
}
