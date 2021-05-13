import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionListComponent } from './auction-list/auction-list.component';


@NgModule({
  declarations: [AuctionListComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule
  ]
})
export class AuctionModule { }
