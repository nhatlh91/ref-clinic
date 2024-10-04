import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FullCalenderRoutingModule} from './full-calender-routing.module';
import {FullCalendarModule} from "@fullcalendar/angular";
import {BookingComponent} from './components/booking/booking.component';


@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    FullCalenderRoutingModule,
    FullCalendarModule,
  ]
})
export class FullCalenderModule {
}
