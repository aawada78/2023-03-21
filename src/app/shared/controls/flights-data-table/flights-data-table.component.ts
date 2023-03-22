import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../../flight-booking/flight';

@Component({
  selector: 'app-flights-data-table',
  templateUrl: './flights-data-table.component.html',
  styleUrls: ['./flights-data-table.component.scss']
})
export class FlightsDataTableComponent {
  @Input() flights: Flight[] = [];
}
