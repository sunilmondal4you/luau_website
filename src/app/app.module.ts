import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandComponent } from './brand/brand.component';
import { InqueriesComponent } from './inqueries/inqueries.component';
import { ServicesComponent } from './services/services.component';
import { SupportComponent } from './support/support.component';
import { DownloadComponent } from './download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandComponent,
    InqueriesComponent,
    ServicesComponent,
    SupportComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
