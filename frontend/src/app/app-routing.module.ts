import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'singleEmployee/:id', component: SingleEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
