import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionListComponent } from './auction-list/auction-list.component';
import {AuctionState} from './state/auction.state';
import {NgxsModule} from '@ngxs/store';
import { DetailAuctionComponent } from './detail-auction/detail-auction.component';


@NgModule({
  declarations: [AuctionListComponent, DetailAuctionComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    NgxsModule.forFeature([AuctionState])
  ]
})
export class AuctionModule { }
