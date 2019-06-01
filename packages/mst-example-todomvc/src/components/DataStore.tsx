import {types} from "mobx-state-tree";
import {deepExtend} from "./deepExtendCopy";

function unionUndefined(...otherTypes: any[]) {
    return unionSomeType(types.undefined, ...otherTypes);
}

function unionSomeType(someType: any, ...otherTypes: any[]) {
    return types.union(someType, ...otherTypes);
}

function optionalObject(type: any, defaultVal: any = {}) {
    return optional(defaultVal, types.model(type))
}

function optionalArray(itemType: any, defaultVal: any = []) {
    return optional(defaultVal, types.array(itemType))
}

function optionalString(defaultVal: string = '') {
    return optional(defaultVal, types.string)
}

function optional(defaultObj: any, type: any) {
    return types.optional(type, defaultObj);
}

export const PersonFactory = optionalObject({
    fio: optionalObject({
        surname: optionalString(),
        name: optionalString(),
        patronymic: optionalString(),
    })
});

export const DataFactory = types.model({
    todo: optionalObject({
            text: optionalString()
        }
    ),
    person: PersonFactory,
    textArray: optionalArray(
        optionalObject({
                inner: optionalObject({
                    value: optionalString()
                })
            }
        )
    ),
    innerTextArray: optionalArray(
        optionalObject({
                value: optionalString()
            }
        )
    ),
})
    .actions(self => ({
            mergeFetchedDataWithStoredData(fetched: DataModel) {
                const extendedFetchedData = DataFactory.create(fetched);
                console.log(extendedFetchedData);
                deepExtend(self, extendedFetchedData);
                console.log(self);
            }
        })
    );

export const StoreFactory = types.model({
    Data: types.optional(DataFactory, {})
});

export const initialState: HasExtendedDataModel = {
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
        },
        textArray: [
            {
                inner: {value: '1'},
            },
            {
                inner: {value: '2'},
            },
            {
                inner: {value: '3'},
            },
            {
                inner: {value: '4'},
            }]
        ,
        innerTextArray: [
            {value: '88'},
            {value: '77'},
            {value: '66'},
            {value: '55'},
        ]
    }
}

export interface TodoItem {
    text?: string;
}

export interface Person extends HasFio {
}

export interface HasFio {
    fio: Fio;
}

export interface StupidText {
    inner?: InnerStupidText;
}

export interface InnerStupidText {
    value?: string;
}

export interface HasStupidText {
    text?: StupidText;
}

export interface HasStupidTextArray {
    textArray?: StupidText[];
}

export interface HasStupidInnerTextArray {
    innerTextArray?: InnerStupidText[];
}

export interface Fio {
    surname?: string
    patronymic?: string
    name?: string
}

export interface DataModel extends HasPerson, HasTodo, HasStupidTextArray, HasStupidInnerTextArray {
}

export interface HasPerson {
    person?: Person
}

export interface HasTodo {
    todo?: TodoItem
}

export interface HasExtendedDataModel<DataExtendedType extends DataModel = DataModel> {
    Data: DataExtendedType;
}

export interface DataActions {
    mergeFetchedDataWithStoredData?: (fetched: DataModel) => void;
}

export type Data = DataModel & DataActions;

export interface DataStore extends HasExtendedDataModel<Data> {
}

export interface HasDataStore {
    store?: DataStore;
}