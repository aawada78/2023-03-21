// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CityPipe } from 'src/app/shared/city.pipe';
import { cityAsync, cityValidator } from 'src/app/shared/validation/reactive.validators';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {
  id = 0;
  showDetails = false;

  flightEditForm: FormGroup;

  private formBuilder = inject(FormBuilder);
  constructor(private route: ActivatedRoute, private flightService: FlightService) {
    this.flightEditForm = this.formBuilder.group({
      id: [this.id],
      from: ['', [Validators.minLength(3), cityValidator], [cityAsync(flightService)]],
      to: ['', [Validators.minLength(3)], [cityAsync(flightService)]],
      urgent: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p.id;
      this.showDetails = p.showDetails;
    });

    this.flightEditForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe({
      next: (formValue) => console.log(formValue)
    });
  }

  save() {
    console.log(this.flightEditForm.value);
  }
}
