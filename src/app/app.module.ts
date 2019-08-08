import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TagsdatabaseComponent } from './tagsdatabase/tagsdatabase.component';
import {DemoMaterialModule} from './material-module';
import { KeycloakService } from './keycloak.service';


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
    ModaltemplateComponent,
    ConfirmationDialogComponent,
    TagsdatabaseComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserModule, 
    BrowserAnimationsModule, 
    MatDialogModule, 
    MatButtonModule,
    DemoMaterialModule

  ],
  providers: [
    NgbActiveModal,
    KeycloakService
  ],
  bootstrap: [AppComponent],

  entryComponents: [ ModaltemplateComponent, ConfirmationDialogComponent ]

})
export class AppModule { }
