// src/app/flight-booking/flight-booking.routes.ts

import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

// Diesen Import hinzufügen
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { LookaheadComponent } from './lookahead/lookahead.component';
import { FlightBookingComponent } from './flight-booking.component';
import { AuthGuard } from '../shared/auth/auth.guard';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent
      },
      {
        path: 'lookahead',
        component: LookaheadComponent
      }
      // {
      //   path: '**',
      //   redirectTo: 'flight-search'
      // }
    ]
  }
];
