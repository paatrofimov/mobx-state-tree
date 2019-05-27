import {types} from "mobx-state-tree";

function unionUndefined(...otherTypes: any[]) {
    return unionSomeType(types.undefined, ...otherTypes);
}

function unionSomeType(someType: any, ...otherTypes: any[]) {
    return types.union(someType, ...otherTypes);
}

function optionalObject(type: any, defaultVal: any = {}) {
    return optional(defaultVal, type)
}

function optionalString(type: any, defaultVal: string = '') {
    return optional(defaultVal, types.string)
}

function optional(defaultObj: any, type: any) {
    return types.optional(type, defaultObj);
}

export const DataFactory = types.model({
    todo: optionalObject(
        types.model({
            text: optionalString(types.string)
        })
    ),
    person: optionalObject(
        types.model({
            fio: optionalObject(
                types.model({
                    surname: optionalString(types.string),
                    name: optionalString(types.string),
                    patronymic: optionalString(types.string),
                }),
            )
        }),
    )
});

export const StoreFactory = types.model({
    Data: types.optional(DataFactory, {})
});

export const initialState: MyStore = {
    Data: {
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
}

export interface TodoItem {
    text?: string;
}

export interface Person {
    fio?: Fio;
}

export interface Fio {
    surname?: string
    patronymic?: string
    name?: string
}

export interface Data {
    todo?: TodoItem
    person?: Person
}

export interface MyStore {
    Data: Data;
}