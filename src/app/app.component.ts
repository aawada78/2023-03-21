import { Component, inject, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello World!';

  private baseUrl = inject(BASE_URL);

  /**
   *
   */
  // constructor(@Inject(BASE_URL) private baseUrl: string) {
  constructor() {
    console.log(this.baseUrl);
    const clickObs = fromEvent(document, 'click');

    const clickTime$ = clickObs.pipe(map((event) => `Event time ${event.timeStamp}`));

    clickTime$.subscribe({
      next: (time) => console.log(time)
    });
  }
}
