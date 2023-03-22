import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello World!';

  /**
   *
   */
  constructor() {
    const clickObs = fromEvent(document, 'click');

    const clickTime$ = clickObs.pipe(map((event) => `Event time ${event.timeStamp}`));

    clickTime$.subscribe({
      next: (time) => console.log(time)
    });
  }
}
