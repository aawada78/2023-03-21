// src/app/flight-card/flight-card.component.ts

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight } from '../flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges {
  @Input() item: Flight | null = null;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  status = 0;
  readonly status$ = new BehaviorSubject<number>(0);

  constructor(private element: ElementRef, private zone: NgZone, private cdr: ChangeDetectorRef) {
    console.debug('ctor', this.item);
  }

  ngOnInit() {
    console.debug('ngOnInit', this.item);

    setTimeout(() => {
      this.status++;
      this.status$.next(this.status);
      setTimeout(() => {
        this.status++;
        this.status$.next(this.status);
        setTimeout(() => {
          this.status++;
          this.status$.next(this.status);
          setTimeout(() => {
            this.status++;
            this.status$.next(this.status);
            setTimeout(() => {
              this.status++;
              this.status$.next(this.status);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    // setTimeout(() => {
    //   this.status++;
    //   this.cdr.detectChanges();
    //   setTimeout(() => {
    //     this.status++;
    //     this.cdr.detectChanges();
    //     setTimeout(() => {
    //       this.status++;
    //       this.cdr.detectChanges();
    //       setTimeout(() => {
    //         this.status++;
    //         this.cdr.detectChanges();
    //         setTimeout(() => {
    //           this.status++;
    //           this.cdr.detectChanges();
    //         }, 1000);
    //       }, 1000);
    //     }, 1000);
    //   }, 1000);
    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.debug('ngOnChanges', this.item);

    if (changes.item) {
      console.debug('ngOnChanges: item');
    }
    if (changes.selected) {
      console.debug('ngOnChanges: selected');
    }
  }

  select() {
    this.selected = true;
    this.selectedChange.emit(true);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.emit(false);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
