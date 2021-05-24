import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Auction} from '../../shared/models/auction.model';
import {Subscription} from 'rxjs';
import {
  UpdateAuctions,
  GetAuctions, GetAuction, ListenForBids, StopListeningForBids, UpdateBids,
} from './auction.actions';
import {AuctionService} from '../shared/auction.service';
import { UpdateSelectedAuction } from './auction.actions';
import {Bid} from '../shared/bid.model';
import {take, tap} from 'rxjs/operators';

export interface AuctionStateModel {
  auctions: Auction[];
  selectedAuction: Auction | null;
  bids: Bid[];
  selectedAuctionPrice: number;
}

@State<AuctionStateModel>({
  name: 'auction',
  defaults: {
    auctions: [],
    selectedAuction: null,
    bids: [],
    selectedAuctionPrice: 0
  }
})

@Injectable()
export class AuctionState {
  bidsSub$: Subscription | undefined;

  constructor(private auctionService: AuctionService) {
  }

  @Selector()
  static auctions(state: AuctionStateModel): Auction[] {
    return state.auctions;
  }

  @Selector()
  static selectedAuction(state: AuctionStateModel): Auction | null {
    return state.selectedAuction;
  }

  @Selector()
  static bids(state: AuctionStateModel): Bid[] | null {
    return state.bids;
  }

  @Selector()
  static selectedAuctionPrice(state: AuctionStateModel): number | null {
    return state.selectedAuctionPrice;
  }

  @Action(GetAuctions)
  getAuctions(ctx: StateContext<AuctionStateModel>): void {
    this.auctionService.getAllAuctions()
      .pipe(
        take(1)
      )
      .subscribe(auctions => {
        ctx.dispatch(new UpdateAuctions(auctions));
      });
  }

  @Action(GetAuction)
  getSelectedAuction(ctx: StateContext<AuctionStateModel>, action: GetAuction): void{
    const currentState = ctx.getState();
    const existingAuction = currentState.auctions.find(auc => String(auc.id) === String(action.auctionId));
    if (existingAuction) {
      ctx.dispatch(new UpdateSelectedAuction(existingAuction));
    } else {
      this.auctionService.getSelectedAuction(action.auctionId)
        .pipe(
          take(1)
        )
        .subscribe(auction => {
          ctx.dispatch(new UpdateSelectedAuction(auction));
        });
    }
  }

  @Action(ListenForBids)
  listenForBids(ctx: StateContext<AuctionStateModel>, action: ListenForBids): void{
    this.auctionService.switchChannel(action.auctionId);
    this.bidsSub$ = this.auctionService.listenForBids()
      .subscribe(res => {
        ctx.dispatch(new UpdateBids(res));
      });
  }

  @Action(UpdateBids)
  updateBids(ctx: StateContext<AuctionStateModel>, ub: UpdateBids): void {
    ctx.patchState({bids: ub.bids});
  }

  @Action(UpdateAuctions)
  updateAuctions(ctx: StateContext<AuctionStateModel>, us: UpdateAuctions): void {
    const state = ctx.getState();
    const newState: AuctionStateModel = {
      ...state,
      auctions: us.auctions
    };
    ctx.setState(newState);
  }

  @Action(UpdateSelectedAuction)
  UpdateSelectedAuction(ctx: StateContext<AuctionStateModel>, auc: UpdateSelectedAuction): void {
    const state = ctx.getState();
    const newState: AuctionStateModel = {
      ...state,
      selectedAuction: auc.selectedAuction
    };
    ctx.setState(newState);
  }

  @Action(StopListeningForBids)
  stopListeningForBids(): void {
    this.bidsSub$?.unsubscribe();
  }
}
