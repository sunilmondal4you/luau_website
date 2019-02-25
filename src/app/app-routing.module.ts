import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { InqueriesComponent } from './inqueries/inqueries.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { DownloadComponent } from './download/download.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';


const routes: Routes = [
  { path: '',         component: HomeComponent,     pathMatch: 'full' },
  { path: 'home',     component: HomeComponent,     pathMatch: 'full' },
  { path: 'brand',    component: BrandComponent,    pathMatch: 'full' },
  { path: 'inqueries',component: InqueriesComponent,pathMatch: 'full' },
  { path: 'services', component: ServicesComponent, pathMatch: 'full' },
  { path: 'suport',   component: SupportComponent,  pathMatch: 'full' },
  { path: 'download', component: DownloadComponent, pathMatch: 'full' },
  { path: 'terms',    component: TermsComponent,    pathMatch: 'full' },
  { path: 'privacy',  component: PrivacyComponent,    pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
