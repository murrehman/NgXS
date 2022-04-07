import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit {

  item!: any;
  constructor(private activatedRoute: ActivatedRoute, private _du: EmployeeService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param => {
      let pid = param.get('id')
      this._du.getEmployeebyId(pid).subscribe(res => {
        console.log(res)
        this.item = res;
      })
    })


  }

}
