import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth/auth.guard';
import {Service} from './service/app.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {GraphComponent} from './graph/graph.component';
import {ExchangeService} from './service/exchange.service';
import {DxDataGridModule} from 'devextreme-angular';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    DxDataGridModule
  ],
  providers: [AuthGuard, Service, ExchangeService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
