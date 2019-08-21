import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { TagsdatabaseComponent } from './tagsdatabase/tagsdatabase.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';

const routes: Routes = [
  { path: '',         redirectTo:'./home/home.component', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent,     pathMatch: 'full' },
  { path: 'brand',    component: BrandComponent,    pathMatch: 'full' },
  { path: 'inquiries',component: InquiriesComponent,pathMatch: 'full' },
  { path: 'services', component: ServicesComponent, pathMatch: 'full' },
  { path: 'support',  component: SupportComponent,  pathMatch: 'full' },
  { path: 'terms',    component: TermsComponent,    pathMatch: 'full' },
  { path: 'privacy',  component: PrivacyComponent,  pathMatch: 'full' },
  { path: 'dashboard',component: DashboardComponent,pathMatch: 'full' },
  { path: 'orders',   component: OrdersComponent,   pathMatch: 'full' },
  { path: 'tagsdatabase', component: TagsdatabaseComponent,      pathMatch: 'full' },
  { path: 'categoties',   component: ProductcategoriesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
