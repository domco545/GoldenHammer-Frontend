import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { StopListeningForAuction, ListenForAuction } from '../state/auction.actions';
import { Auction } from '../../shared/auction.model';
import { Observable } from 'rxjs';
import { AuctionState } from '../state/auction.state';

@Component({
  selector: 'app-detail-auction',
  templateUrl: './detail-auction.component.html',
  styleUrls: ['./detail-auction.component.scss']
})
export class DetailAuctionComponent implements OnInit, OnDestroy {
  public auctionId = '';
  @Select(AuctionState.selectedAuction) selectedAuction: Observable<Auction> | undefined;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.auctionId = res.params.auctionId;
      this.store.dispatch(new ListenForAuction(this.auctionId));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForAuction());
  }

}
