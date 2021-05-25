import {Bid} from './bid.model';

export interface ListenForBidsDto {
  bids: Bid[];
  currentItemPrice: number;
}
