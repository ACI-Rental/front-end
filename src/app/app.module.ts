import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    HistoryPageComponent,
    DropdownComponent,
    ProductListComponent,
    ProductFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
