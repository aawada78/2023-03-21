import { AfterContentInit, AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabbedPaneService } from './tabbed-pane.service';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss'],
  providers: [TabbedPaneService]
})
export class TabbedPaneComponent implements AfterViewInit, AfterContentInit {
  @ContentChildren(TabComponent)
  tabQueryList: QueryList<TabComponent> | undefined;

  activatedTab: TabComponent | undefined;
  currentPage = -1;

  constructor(private tabbedPaneService: TabbedPaneService) {}

  // tabs: Array<TabComponent> = [];
  get tabs(): TabComponent[] {
    return this.tabQueryList?.toArray() ?? [];
  }

  ngAfterViewInit(): void {
    // this.tabbedPaneService.pageCount.next(this.tabs.length);
    this.tabbedPaneService.updatePageCount(this.tabs.length);

    this.tabbedPaneService.currentPage$.subscribe({
      next: (page) => {
        if (page === this.currentPage) {
          return;
        }
        this.pageChange(page);
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      this.activate(this.tabs[0]);
    }
  }

  // register(tab: TabComponent): void {
  //   this.tabs.push(tab);
  // }

  activate(active: TabComponent): void {
    this.tabs.forEach((tab, index) => {
      if (tab === active) {
        this.currentPage = index;
        // this.tabbedPaneService.currentPage.next(this.currentPage);
        this.tabbedPaneService.updateCurrentPage(this.currentPage);
      }
      tab.visible = tab === active;
    });

    this.activatedTab = active;
  }

  pageChange(page: number) {
    this.activate(this.tabs[page]);
  }
}
