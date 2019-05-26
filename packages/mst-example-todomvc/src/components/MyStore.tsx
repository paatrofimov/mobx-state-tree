import { observable } from "mobx"

export const initialState : Data = {
    person: {
        fio: {
            surname: "sur1",
            name: "name1",
            patronymic: "patro1"
        }
    },
    todo: {
        text: "first"
    }
}

export class TodoItemImpl {
    @observable text: string = ""
}

export class PersonImpl {
    @observable fio: FioImpl = new FioImpl()
}

export class FioImpl {
    @observable surname: string = ""
    @observable patronymic: string = ""
    @observable name: string = ""
}

export class Data {
    @observable todo: TodoItemImpl = new TodoItemImpl()
    @observable person: PersonImpl = new PersonImpl()
}

export class MyStore {
    @observable Data: Data = new Data()
}