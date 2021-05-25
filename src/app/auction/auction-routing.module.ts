import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuctionListComponent} from './auction-list/auction-list.component';
import {DetailAuctionComponent} from './detail-auction/detail-auction.component';


const routes: Routes = [
  {path: '', redirectTo: '/auction/list', pathMatch: 'full'},
  {path: 'list', component: AuctionListComponent},
  {path: 'detail/:auctionId', component: DetailAuctionComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
