import {Auction} from '../../shared/models/auction.model';

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
export class ListenForAuction {
  constructor(public auctionId: string) { }
  static readonly type = '[Auction] Get Auction';
}

export class GetAuction {
  constructor(public selectedAuction: string) { }
  static readonly type = '[Auction] Get Auction';
}
export class UpdateSelectedAuction {
  constructor(public selectedAuction: Auction) {}
  static readonly type = '[Auction] Update selected Auction';
}
export class StopListeningForAuction {
  static readonly type = '[Auction] Stop Listening For Auctions';
}
