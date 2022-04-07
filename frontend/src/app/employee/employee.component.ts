import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';
import { GetEmployee } from '../store/actions/employee.action';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  empForm!: FormGroup;
  showModal = false;
  editMode = false;
  employees!: any;
  rep: any;

  //@select gets the selected data by selector into component
  // we can use this observable directly into html with | async
  @Select(EmployeeState.getEmployeeList) employees$!: Observable<Employee[]>;

  //checking with boolean if state has data saved
  @Select(EmployeeState.employeesLoaded) employeesLoaded$!: Observable<boolean>;
  //for unsubscribing subscribe stream ngOnDestroy
  empLoadedSub!: Subscription;


  constructor(private fb: FormBuilder, private empService: EmployeeService, private store: Store) {
    // console.log(Date.now());
  }

  ngOnInit(): void {


    this.getEmployees();

    //state management
    // this.employees$.subscribe(res => {
    //   console.log('state slice =>', res);

    //   this.employees = res;
    // })


    this.empForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: ['']
    })
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      if (this.editMode) {
        this.empService.updateEmployee(this.empForm.value).subscribe(res => {
          console.log(res)
          this.getEmployees();
        },
          err => {
            console.log(err)
          })
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe(res => {
          console.log(res)
          this.getEmployees();
        },
          err => {
            console.log(err)
          })
      }
    }
    this.empForm.reset();
  }

  onAddEmployee() {

    this.showModal = true;
    console.log(this.showModal);
  }

  onCloseModal() {
    this.showModal = false;
    this.editMode = false;
  }


  //this method is when you use regular nodejs with Mongodb
  getEmployees() {
    // this.empService.getEmployeeList().subscribe((res: any) => {
    //   this.employees = res;
    // })


    //STATE MANAGEMENT
    //checking if state has data
    this.empLoadedSub = this.employeesLoaded$.subscribe(empLoaded => {
      if (!empLoaded) {
        //dispatching to get data from server
        this.store.dispatch(new GetEmployee());
      }
    })

  }


  // The below method is when you use firebase as database
  // getEmployees() {
  //   console.log("getEmployees() is called")
  //   this.empService.getEmployeeList().subscribe((res: any) => {
  //     if (res !== null) {
  //       this.rep = Object.keys(res);
  //       for (var _i = 0; _i < this.rep.length; _i++) {
  //         this.employees = Object.values(res)
  //         this.employees[_i]._id = this.rep[_i]
  //       }
  //     }
  //   })
  // }


  //THIS METHOD IF USING CONVENTIONAL NODEJS WITH MONGODB
  onDeleteEmployee(id: any) {
    if (confirm('Do you want to delete this Employee?')) {
      this.empService.deleteEmployee(id).subscribe((res) => {
        console.log(res)
        this.getEmployees();
        console.log('Deleted Successfully!')
      },
        (err) => {
          console.log(err)
        })
    }
  }


  //THE BELOW method if use FIREBASE as databse
  // onDeleteEmployee(id: any, i: any) {
  //   if (confirm('Do you want to delete this Employee?')) {
  //     this.empService.deleteEmployee(id).subscribe(res => {
  //       this.employees.splice(i, 1)
  //       console.log(res);
  //       this.getEmployees();
  //       console.log('Deleted Successfully!')

  //     }, err => {
  //       console.log(err)
  //     })
  //   }
  // }

  onEditEmployee(emp: any) {
    console.log(emp)
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp)
  }

  ngOnDestroy(): void {
    this.empLoadedSub.unsubscribe();
  }
}
