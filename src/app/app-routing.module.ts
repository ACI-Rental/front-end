import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryPageComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  { path: 'product', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductFormComponent, canActivate: [AuthGuard]},
  { path: 'reservations', component: ReservationsPageComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductsPageComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
