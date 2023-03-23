// src/app/app.module.ts

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { BasketComponent } from './basket/basket.component';
import { CustomerModule } from './customer/customer.module';
import { environment } from 'src/environments/environment';
import { CustomPreloadingStrategy } from './custom-preloading.strategy';

export const BASE_URL = new InjectionToken('BASE_URL', {
  providedIn: 'root',
  factory: () => {
    if (environment.production) {
      return 'https://www.bing.ch';
    } else {
      return 'https://www.google.ch';
    }
  }
});

@NgModule({
  imports: [
    CustomerModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: CustomPreloadingStrategy }),
    HttpClientModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, AboutComponent, NotFoundComponent, BasketComponent],
  providers: [
    // {
    //   provide: BASE_URL,
    //   useValue: 'https://www.google.ch'
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
