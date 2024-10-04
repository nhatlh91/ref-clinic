import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportMainComponent } from './components/report-main/report-main.component';
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import { RevenueByCustomerComponent } from './components/revenue-by-customer/revenue-by-customer.component';


@NgModule({
  declarations: [
    ReportMainComponent,
    RevenueByCustomerComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatTooltip,
    MatMenuTrigger
  ]
})
export class ReportModule { }
