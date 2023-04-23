import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlightService } from 'src/app/flight-booking/flight.service';

export function cityValidator(c: AbstractControl) {
  console.log('CityValidator');

  const validCities = ['Graz', 'Hamburg', 'Frankfurt', 'Wien', 'Mallorca', 'Bern', 'Zürich'];
  if (validCities.indexOf(c.value) !== -1) {
    return {};
  }

  return {
    city: {
      currentValue: c.value,
      validCities: validCities
    }
  };
}

export function cityAsync(flightService: FlightService): ValidatorFn {
  console.log('AsyncCityValidator');

  return (c: AbstractControl): Observable<ValidationErrors> => {
    if (c.value) {
      return flightService.find(c.value, '').pipe(
        map((flights) => {
          if (flights.length > 0) {
            return {};
          }
          return {
            cityAsync: {
              currentValue: c.value
            }
          };
        })
      );
    }

    return of({});
  };
}
