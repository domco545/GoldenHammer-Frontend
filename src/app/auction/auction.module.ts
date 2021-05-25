import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionListComponent } from './auction-list/auction-list.component';
import {AuctionState} from './state/auction.state';
import {NgxsModule} from '@ngxs/store';
import { DetailAuctionComponent } from './detail-auction/detail-auction.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AuctionListComponent, DetailAuctionComponent],
    imports: [
        CommonModule,
        AuctionRoutingModule,
        NgxsModule.forFeature([AuctionState]),
        ReactiveFormsModule
    ]
})
export class AuctionModule { }
