import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookaheadComponent } from './lookahead.component';

describe('LookaheadComponent', () => {
  let component: LookaheadComponent;
  let fixture: ComponentFixture<LookaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookaheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
