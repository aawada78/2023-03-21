// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date/date.component';
import { CityPipe } from './city.pipe';
import { StatusColorPipe } from './status-color.pipe';
import { StatusFilterPipe } from './status-filter.pipe';
import { FormsModule } from '@angular/forms';

// Von der CLI eingefügt
import { CityValidationDirective } from './validation/city-validation.directive';
import { TabbedPaneComponent } from './controls/tabbed-pane/tabbed-pane.component';
import { TabComponent } from './controls/tab/tab.component';
import { TabNavigatorComponent } from './controls/tab-navigator/tab-navigator.component';
import { ClickWithWarningDirective } from './directives/click-with-warning.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { TableFieldDirective } from './directives/table-field.directive';
import { DataTableComponent } from './controls/data-table/data-table.component';
import { FlightsDataTableComponent } from './controls/flights-data-table/flights-data-table.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,

    // Von der CLI eingefügt
    CityValidationDirective,
    TabbedPaneComponent,
    TabComponent,
    TabNavigatorComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    TableFieldDirective,
    DataTableComponent,
    FlightsDataTableComponent
  ],
  exports: [
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    FormsModule,
    CommonModule,

    // Neue Einträge
    CityValidationDirective,
    TabbedPaneComponent,
    TabComponent,
    TabNavigatorComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    TableFieldDirective,
    DataTableComponent,
    FlightsDataTableComponent
  ]
})
export class SharedModule {}
