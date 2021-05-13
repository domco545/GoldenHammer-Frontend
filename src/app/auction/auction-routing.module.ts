import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuctionListComponent} from './auction-list/auction-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/auction/list', pathMatch: 'full'},
  {path: 'list', component: AuctionListComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
