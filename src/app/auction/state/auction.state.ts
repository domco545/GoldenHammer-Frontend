import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Auction} from '../../shared/auction.model';
import {Subscription} from 'rxjs';
import {ListenForAuctions, StopListeningForAuctions, UpdateAuctions} from './auction.actions';
import {AuctionService} from '../shared/auction.service';

export interface AuctionStateModel {
  auctions: Auction[];
}

@State<AuctionStateModel>({
  name: 'auction',
  defaults: {
    auctions: [],
  }
})

@Injectable()
export class AuctionState {
  private auctionUnsub: Subscription | undefined;

  constructor(private auctionService: AuctionService) {
  }

  @Selector()
  static auctions(state: AuctionStateModel): Auction[] {
    return state.auctions;
  }

  @Action(ListenForAuctions)
  getAuctions(ctx: StateContext<AuctionStateModel>): void {
    this.auctionUnsub = this.auctionService.getAllAuctions()
      .subscribe(auctions => {
        ctx.dispatch(new UpdateAuctions(auctions));
      });
  }

  @Action(StopListeningForAuctions)
  stopListeningForAuctions(ctx: StateContext<AuctionStateModel>): void {
    if (this.auctionUnsub) {
      this.auctionUnsub.unsubscribe();
    }
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
}
