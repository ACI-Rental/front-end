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
import { ModalComponent } from './components/modal/modal.component'

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
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [SharedService/*, {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
