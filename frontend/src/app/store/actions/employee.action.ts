import { Employee } from "src/app/appModels/employee.model";

export class AddEmployee {
    static readonly type = '[Employee] Add';

    constructor(public payload: Employee) { }
}

export class GetEmployee {
    static readonly type = '[Employee] GET';

}

export class SetSelectedEmployee {
    static readonly type = '[Employee] Set'
    constructor(public id: string) { }
}

export class DeleteEmployee {
    static readonly type = '[Employee] Delete';

    constructor(public id: string) { }
}

export class UpdateEmployee {
    static readonly type = '[Employee] Update';

    constructor(public payload: Employee) { }
}