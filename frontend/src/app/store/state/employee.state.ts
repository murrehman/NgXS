import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, UpdateState } from "@ngxs/store";
import { Employee } from "src/app/appModels/employee.model";
import { EmployeeService } from "src/app/appServices/employee.service";
import { AddEmployee, DeleteEmployee, GetEmployee, SetSelectedEmployee, UpdateEmployee } from "../actions/employee.action";
import { tap } from "rxjs/operators";
import { StateContextFactory } from "@ngxs/store/src/internal/state-context-factory";


//State Model
export class EmployeeStateModel {
    employees!: Employee[]
    employeesLoaded!: boolean
    selectedEmployee!: Employee;
}


//State
@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeesLoaded: false,
        selectedEmployee: null as any
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

    //Get selected Employee from state
    @Selector()
    static selectedEmployee(state: EmployeeStateModel) {
        return state.selectedEmployee;
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

    @Action(SetSelectedEmployee)
    setSelectedEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetSelectedEmployee) {
        console.log(id)

        const state = getState();
        const empList = state.employees;

        const index = empList.findIndex(emp => emp._id === id)
        // console.log(empList[index])
        if (empList.length > 0) {
            setState({
                ...state,
                selectedEmployee: empList[index]
            })
        } else {
            this._empService.getEmployeebyId(id).subscribe(res => {
                const state = getState();
                const empList = [res]

                setState({
                    ...state,
                    employees: empList,
                    selectedEmployee: empList[0]
                })
            })
        }
        // following else block give err, not all code paths return a value = fix in typescript config file

        // } else {
        //     return this._empService.getEmployeebyId(id).pipe(tap(res => {
        //         const state = getState();
        //         const empList = [res]

        //         setState({
        //             ...state,
        //             employees: empList,
        //             selectedEmployee: empList[0]
        //         })
        //     }))
        // }

    }

    // ADD DATA IN STATE AND DATABASE
    @Action(AddEmployee)
    addEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this._empService.addEmployee(payload).pipe(tap(res => {
            const state = getState();

            patchState({
                employees: [...state.employees, res]
            })
        }))
    }

    // DELETE DATA IN STATE AND DATABASE
    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this._empService.deleteEmployee(id).pipe(tap(res => {
            const state = getState();
            const filteredEmployees = state.employees.filter(emp => emp._id !== id)
            setState({
                ...state,
                employees: filteredEmployees
            })
            console.log(res);

        }))


    }

    @Action(UpdateEmployee)
    updateEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: UpdateEmployee) {
        console.log(payload);

        return this._empService.updateEmployee(payload).pipe(tap(res => {
            console.log(res)
            const state = getState();
            const empList = state.employees;
            const index = empList.findIndex(emp => emp._id == payload._id)

            empList[index] = res

            patchState({
                employees: empList
            })

        }))

    }

}