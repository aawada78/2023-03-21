// src/app/flight-search/flight-search.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;
  terminator$ = new Subject<void>();

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  flights$ = this.flightService.flights$;

  constructor(private flightService: FlightService) {}

  ngOnDestroy(): void {
    this.terminator$.next();
    this.terminator$.complete();
  }

  ngOnInit(): void {
    this.flights$.pipe(takeUntil(this.terminator$)).subscribe({
      next: (foundFlights) => console.log(foundFlights.length + 'flights found!')
    });
  }

  // get flights() {
  //   // We will refactor this to an observable in a later exercise!
  //   return this.flightService.flights;
  // }

  search(): void {
    this.flightService.load(this.from, this.to);
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }
}
