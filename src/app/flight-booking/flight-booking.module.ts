// src/app/flight-booking/flight-booking.module.ts

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { RouterModule } from '@angular/router';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookaheadComponent } from './lookahead/lookahead.component';

@NgModule({
  imports: [RouterModule.forChild(FLIGHT_BOOKING_ROUTES), FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    FlightBookingComponent,
    FlightEditComponent,
    LookaheadComponent
  ],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
