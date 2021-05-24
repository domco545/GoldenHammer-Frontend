import {Auction} from '../../shared/models/auction.model';
import {Bid} from '../shared/bid.model';

export class GetAuctions {
  static readonly type = '[Auction] Get Auctions';
}

export class UpdateAuctions {
  constructor(public auctions: Auction[]) {}
  static readonly type = '[Auction] Update Auctions';
}

export class GetAuction {
  constructor(public auctionId: string) { }
  static readonly type = '[Auction] Get Auction';
}

export class ListenForBids {
  constructor(public auctionId: string) { }
  static readonly type = '[Auction] Listen For Bids';
}

export class StopListeningForBids {
  static readonly type = '[Auction] Stop Listening For Bids';
}

export class UpdateBids {
  constructor(public bids: Bid[]) {}
  static readonly type = '[Auction] Update Bids';
}

export class UpdateSelectedAuction {
  constructor(public selectedAuction: Auction) {}
  static readonly type = '[Auction] Update selected Auction';
}
