import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';
import { SetSelectedEmployee } from '../store/actions/employee.action';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit, OnDestroy {

  @Select(EmployeeState.selectedEmployee) selectedEmployee$!: Observable<Employee>
  selectedEmpSub!: Subscription;
  item!: Employee;
  constructor(private activatedRoute: ActivatedRoute, private _du: EmployeeService, private store: Store) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param => {
      let pid = param.get('id')
      this.getEmployeebyId(pid)
      // this._du.getEmployeebyId(pid).subscribe(res => {
      //   console.log(res)
      //   this.item = res;
      // })
    })
  }

  getEmployeebyId(id: any) {
    this.store.dispatch(new SetSelectedEmployee(id))
    this.selectedEmpSub = this.selectedEmployee$.subscribe(res => {
      this.item = res;
    })
  }

  ngOnDestroy(): void {
    this.selectedEmpSub.unsubscribe();
  }

}
