import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
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
  online = true;
  online$: Observable<boolean> = of(true);

  constructor(private flightService: FlightService) {
    this.control = new FormControl();
  }

  ngOnInit(): void {
    // Without combination operators
    // this.flights$ = this.control.valueChanges.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   tap(() => (this.loading = true)),
    //   switchMap((value) => this.flightService.find(value, '')),
    //   tap(() => (this.loading = false))
    // );

    this.online$ = interval(2000).pipe(
      startWith(1),
      map(() => Math.random() < 0.5),
      distinctUntilChanged(),
      tap((value) => (this.online = value))
    );

    const input$ = this.control.valueChanges.pipe(debounceTime(300));

    this.flights$ = combineLatest([this.online$, input$]).pipe(
      filter(([online]) => online),
      map(([, input]) => input),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((value) => this.flightService.find(value, '')),
      tap(() => (this.loading = false))
    );
  }
}
