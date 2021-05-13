import {Auction} from '../shared/auction.model';

export class ListenForAuctions {
  static readonly type = '[Auction] Listen For Auctions';
}

export class StopListeningForAuctions {
  static readonly type = '[Auction] Stop Listening For Auctions';
}

export class UpdateAuctions {
  constructor(public auctions: Auction[]) {}

  static readonly type = '[Auction] Update Auctions';
}
