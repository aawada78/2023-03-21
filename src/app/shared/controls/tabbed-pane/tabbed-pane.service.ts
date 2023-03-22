import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabbedPaneService {
  private pageCountSubj = new BehaviorSubject<number>(0);
  private currentPageSubj = new BehaviorSubject<number>(0);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly pageCount$ = this.pageCountSubj.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly currentPage$ = this.currentPageSubj.asObservable();

  public updatePageCount(count: number): void {
    this.pageCountSubj.next(count);
  }

  public updateCurrentPage(currentPage: number): void {
    this.currentPageSubj.next(currentPage);
  }
}
