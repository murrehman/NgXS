import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AuthComponent,
    SingleEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FormBuilder,
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
