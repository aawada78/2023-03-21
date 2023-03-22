import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-lookahead',
  templateUrl: './lookahead.component.html',
  styleUrls: ['./lookahead.component.scss']
})
export class LookaheadComponent implements OnInit {
  control: FormControl;
  flights$: Observable<Flight[]> = of([]);
  loading = false;

  flightsArray: Flight[] = [];

  constructor(private flightService: FlightService) {
    this.control = new FormControl();
  }

  ngOnInit(): void {
    this.flights$ = this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((value) => this.flightService.find(value, '')),
      tap((flights) => (this.flightsArray = flights)),
      tap(() => (this.loading = false))
    );
  }
}
