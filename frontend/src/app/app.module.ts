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

//NgXS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { EmployeeState } from './store/state/employee.state';

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
    FormsModule,
    NgxsModule.forRoot([EmployeeState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [FormBuilder,
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
