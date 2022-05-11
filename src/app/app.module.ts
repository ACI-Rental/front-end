import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { SharedService } from './services/shared/shared.service';
import { initializeKeycloak } from './init/keycloak.init.factory';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ModalComponent } from './components/modal/modal.component';
import { ProductInventoryPageComponent } from './pages/product-inventory-page/product-inventory-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    HistoryPageComponent,
    DropdownComponent,
    ProductListComponent,
    ProductFiltersComponent,
    TableComponent,
    DateRangeComponent,
    ModalComponent,
    ProductInventoryPageComponent,
    DashboardPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    [SweetAlert2Module.forRoot()],

  ],
  providers: [
    SharedService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
