import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Employee } from '../appModels/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/employees'

  //url = 'https://authangular-012-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }


  addEmployee(emp: Employee) {
    return this.http.post<Employee>(this.url, emp)
  }

  getEmployeeList() {
    return this.http.get<Employee[]>(this.url)
  }

  //get single employee
  getEmployeebyId(id: any) {
    return this.http.get<Employee>(this.url + `/${id}`)
  }


  deleteEmployee(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }


  updateEmployee(emp: Employee) {
    return this.http.put<Employee>(`${this.url}/${emp._id}`, emp)
  }


}
