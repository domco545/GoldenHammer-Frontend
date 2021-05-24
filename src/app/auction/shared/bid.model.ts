import {User} from '../../shared/models/user.model';

export interface Bid {
  id: string;
  value: number;
  date: Date;
  bidder: User;
}
