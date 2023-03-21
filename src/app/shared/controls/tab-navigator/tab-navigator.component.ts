import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabbedPaneService } from '../tabbed-pane/tabbed-pane.service';

@Component({
  selector: 'app-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss']
})
export class TabNavigatorComponent implements OnInit {
  // @Input() page = 0;
  // @Input() pageCount = 0;
  // @Output() pageChange = new EventEmitter<number>();

  page = 0;
  pageCount = 0;

  constructor(private tabbedPaneService: TabbedPaneService) {}

  ngOnInit(): void {
    this.tabbedPaneService.pageCount.subscribe({
      next: (pageCount) => {
        this.pageCount = pageCount;
      }
    });

    this.tabbedPaneService.currentPage.subscribe({
      next: (currentPage) => {
        this.page = currentPage;
      }
    });
  }

  prev() {
    if (this.page <= 0) {
      return;
    }

    this.page--;
    // this.pageChange.emit(this.page);
    this.tabbedPaneService.currentPage.next(this.page);
  }

  next() {
    if (this.page >= this.pageCount - 1) {
      return;
    }

    this.page++;
    // this.pageChange.emit(this.page);
    this.tabbedPaneService.currentPage.next(this.page);
  }
}
