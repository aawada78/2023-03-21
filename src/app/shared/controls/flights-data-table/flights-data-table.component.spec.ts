import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDataTableComponent } from './flights-data-table.component';

describe('FlightsDataTableComponent', () => {
  let component: FlightsDataTableComponent;
  let fixture: ComponentFixture<FlightsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
