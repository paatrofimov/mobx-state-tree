import {inject, observer} from "mobx-react"
import React from "react"
import {devLogVerbose} from ".."
import Person, {default as PersonComponent} from "./PersonComponent"
import {Data, DataFactory, MyStore} from "./MyStore"
import TodoItemComponent from "./TodoItemComponent"
import deepExtend from "deep-extend";

export function bindPath<Root, Value = any>(fn: (x: Root) => Value) {
    return fn;
}

export interface BindingProps<Root = any> {
    bindingRoot: Root;
    bindingPath: <Root, BoundValue>(root: Root) => BoundValue;
}

class App extends React.Component<{ store: MyStore }> {
    render() {
        return <PersonWithItem store={this.props.store}/>
    }
}

@inject(stores => stores)
@observer
@devLogVerbose
class PersonWithItem extends React.Component<{ store: MyStore }> {

    mergeFetchedDataWithStoredData(fetched: Data) {
        const {Data} = this.props.store;
        const extendedFetchedData = DataFactory.create(fetched);
        console.log(extendedFetchedData);
        deepExtend(Data, extendedFetchedData);
        console.log(Data);
    }

    render(): JSX.Element {
        const {Data} = this.props.store;

        return (
            <div>
                <PersonComponent bindingPath={bindPath<Data>(x => x.person)} bindingRoot={Data}/>
                <TodoItemComponent bindingPath={bindPath<Data>(x => x.todo)} bindingRoot={Data}/>
                <button onClick={() => {
                    const fetchedData: Data = {
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
                    };
                    this.mergeFetchedDataWithStoredData(fetchedData);
                }}>
                    fetch same data
                </button>
                <button onClick={() => {
                    const fetchedData: Data = {
                        person: {
                            fio: {
                                surname: "sur1",
                                name: "name1",
                                patronymic: "patro1"
                            }
                        },
                        todo: {
                            text: "second"
                        }
                    };
                    this.mergeFetchedDataWithStoredData(fetchedData);
                }}>
                    fetch same person other todo
                </button>
                <button onClick={() => {
                    const fetchedData: Data = {
                        person: {
                            fio: {
                                surname: "sur1",
                                name: "name1",
                                patronymic: "patro1"
                            }
                        },
                    };
                    this.mergeFetchedDataWithStoredData(fetchedData);
                }}>
                    fetch same person no todo
                </button>
                <button onClick={() => {
                    const fetchedData: Data = {
                        person: {
                            fio: {
                                surname: "sur3",
                            }
                        },
                        todo: {
                            text: "first"
                        }
                    };
                    this.mergeFetchedDataWithStoredData(fetchedData);
                }}>
                    fetch person with only surname
                </button>
                <button onClick={() => {
                    const fetchedData: Data = {
                        person: {
                            fio: {
                                surname: "sur5",
                                name: "name1",
                                patronymic: "patro1"
                            }
                        },
                        todo: {
                            text: "first"
                        }
                    };
                    this.mergeFetchedDataWithStoredData(fetchedData);
                }}>
                    fetch same person with diff surname
                </button>
            </div>
        )
    }
}


export default App
