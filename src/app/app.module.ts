import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { DownloadComponent } from './download/download.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ModaltemplateComponent } from './modaltemplate/modaltemplate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandComponent,
    InquiriesComponent,
    ServicesComponent,
    SupportComponent,
    DownloadComponent,
    TermsComponent,
    PrivacyComponent,
    DashboardComponent,
    OrdersComponent,
    ModaltemplateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],

  entryComponents: [ ModaltemplateComponent ]

})
export class AppModule { }
