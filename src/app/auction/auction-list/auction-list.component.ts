import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuctionState} from '../state/auction.state';
import {Observable} from 'rxjs';
import {Auction} from '../../shared/models/auction.model';
import {Select, Store} from '@ngxs/store';
import {ListenForAuctions, StopListeningForAuctions} from '../state/auction.actions';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit, OnDestroy {
  @Select(AuctionState.auctions) auctions$: Observable<Auction[]> | undefined;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForAuctions());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForAuctions());
  }

}
