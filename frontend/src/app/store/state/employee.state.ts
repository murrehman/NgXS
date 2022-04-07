import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/appModels/employee.model";
import { EmployeeService } from "src/app/appServices/employee.service";
import { GetEmployee } from "../actions/employee.action";
import { tap } from "rxjs/operators";


//State Model
export class EmployeeStateModel {
    employees!: Employee[]
    employeesLoaded!: boolean
}


//State
@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeesLoaded: false
    }

})

@Injectable()
export class EmployeeState {

    constructor(private _empService: EmployeeService) { }

    //Selects data what we want
    //How much n what type of data we want -- aber revise concept
    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees
    }

    //get loaded employees info
    @Selector()
    static employeesLoaded(state: EmployeeStateModel) {
        return state.employeesLoaded;
    }


    @Action(GetEmployee)
    getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
        console.log('State action')

        return this._empService.getEmployeeList().pipe(tap(res => {
            console.log('tap res ', res)
            const state = getState();
            setState({
                ...state,
                employees: res,
                employeesLoaded: true
            })
        }))
    }

}