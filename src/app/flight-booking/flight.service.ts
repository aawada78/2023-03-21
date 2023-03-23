// src/app/default-flight.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share, shareReplay } from 'rxjs/operators';
import { BASE_URL } from '../app.module';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];

  private flightsSubject$ = new BehaviorSubject<Flight[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly flights$ = this.flightsSubject$.asObservable();

  private baseUrl = inject(BASE_URL);
  constructor(private http: HttpClient) {
    console.log(this.baseUrl);
  }

  load(from: string, to: string): void {
    const find$ = this.find(from, to).pipe(
      filter((flights) => {
        console.log('Filter triggered!');
        return flights.length >= 3;
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Subscription #1
    find$.subscribe({
      next: (flights) => {
        this.flights = flights;
        this.flightsSubject$.next(flights);
        console.log('Subscription #1', flights);
      },
      error: (err) => {
        console.error('error', err);
      },
      complete: () => console.log('Subscription #1 complete!')
    });

    setTimeout(() => {
      // Subscription #2
      find$.subscribe({
        next: (flights) => {
          // this.flights = flights;
          // this.flightsSubject$.next(flights);
          console.log('Subscription #2', flights);
        },
        error: (err) => {
          console.error('error', err);
        },
        complete: () => console.log('Subscription #2 complete!')
      });
    }, 2000);
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(url, { headers, params });
  }

  delay(): void {
    const delayedDate = new Date(this.flights[0].date);
    delayedDate.setTime(delayedDate.getTime() + 1000 * 60 * 15);
    // this.flights[0].date = date.toISOString();

    const oldFlight = this.flights[0];

    const newFlight = { ...oldFlight, date: delayedDate.toISOString() };

    this.flights = this.flights.map((flight) => (flight.id === newFlight.id ? newFlight : flight));
    this.flightsSubject$.next(this.flights);
  }
}
