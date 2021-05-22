import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Auction} from '../../shared/auction.model';
import {Subscription} from 'rxjs';
import {
  ListenForAuctions,
  StopListeningForAuctions,
  UpdateAuctions,
  ListenForAuction,
} from './auction.actions';
import {AuctionService} from '../shared/auction.service';
import { UpdateSelectedAuction } from './auction.actions';

export interface AuctionStateModel {
  auctions: Auction[];
  selectedAuction: Auction | null;
}

@State<AuctionStateModel>({
  name: 'auction',
  defaults: {
    auctions: [],
    selectedAuction: null
  }
})

@Injectable()
export class AuctionState {
  private auctionUnsub: Subscription | undefined;
  private selectedAuctionUnsub: Subscription | undefined;

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

  @Action(ListenForAuctions)
  getAuctions(ctx: StateContext<AuctionStateModel>): void {
    this.auctionUnsub = this.auctionService.getAllAuctions()
      .subscribe(auctions => {
        ctx.dispatch(new UpdateAuctions(auctions));
      });
  }

  @Action(ListenForAuction)
  getSelectedAuction(ctx: StateContext<AuctionStateModel>, action: ListenForAuction): void{
    const currentState = ctx.getState();
    const existingAuction = currentState.auctions.find(auc => String(auc.id) === String(action.auctionId));
    if (existingAuction) {
      ctx.dispatch(new UpdateSelectedAuction(existingAuction));
    } else {
      this.selectedAuctionUnsub = this.auctionService.getSelectedAuction(action.auctionId)
        .subscribe(auction => {
          ctx.dispatch(new UpdateSelectedAuction(auction));
        });
    }
  }

  @Action(StopListeningForAuctions)
  stopListeningForAuctions(ctx: StateContext<AuctionStateModel>): void {
    if (this.auctionUnsub) {
      this.auctionUnsub.unsubscribe();
    }
  }

  @Action(StopListeningForAuctions)
  stopListeningForAuction(ctx: StateContext<AuctionStateModel>): void {
    if (this.selectedAuctionUnsub) {
      this.selectedAuctionUnsub.unsubscribe();
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

  @Action(UpdateSelectedAuction)
  UpdateSelectedAuction(ctx: StateContext<AuctionStateModel>, auc: UpdateSelectedAuction): void {
    const state = ctx.getState();
    const newState: AuctionStateModel = {
      ...state,
      selectedAuction: auc.selectedAuction
    };
    ctx.setState(newState);
  }
}
