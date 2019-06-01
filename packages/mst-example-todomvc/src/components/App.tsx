import React from "react"
import {default as PersonComponent} from "./PersonComponent"
import {Data, DataModel, HasDataStore} from "./DataStore"
import TodoItemComponent from "./TodoItemComponent"
import {StupidInnerTextArrayComponent, StupidTextArrayComponent} from "./StupidTextComponent";
import {bind} from "./Binding";
import {observerComponent} from "./ObserverComponentDecorator";

class App extends React.Component {
    render() {
        return <PersonWithItem/>
    }
}

@observerComponent
class PersonWithItem extends React.Component<HasDataStore> {

    merge(fetchedData: Data) {
        (this.props.store!.Data as any).mergeFetchedDataWithStoredData(fetchedData);
    }

    render(): JSX.Element {
        const {store} = this.props;
        const {Data} = store!;

        return (
            <div>
                <PersonComponent {...bind(Data, x => x.person!)}/>
                <TodoItemComponent {...bind(Data, x => x.todo!)}/>
                <StupidTextArrayComponent {...bind(Data, x => x.textArray!)}/>
                <StupidInnerTextArrayComponent {...bind(Data, x => x.innerTextArray!)}/>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                    this.merge(fetchedData);
                }}>
                    fetch same data
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                    this.merge(fetchedData);
                }}>
                    fetch same person other todo
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
                        person: {
                            fio: {
                                surname: "sur1",
                                name: "name1",
                                patronymic: "patro1"
                            }
                        },
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same person no todo
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
                        person: {
                            fio: {
                                surname: "sur3",
                            }
                        },
                        todo: {
                            text: "first"
                        }
                    };
                    this.merge(fetchedData);
                }}>
                    fetch person with only surname
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                    this.merge(fetchedData);
                }}>
                    fetch same person with diff surname
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same text array
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                                inner: {value: '7'},
                            },
                            {
                                inner: {value: '4'},
                            }]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch different text array same size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                                inner: {value: '7'},
                            }]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch different text array less size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            }]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same text array less size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            },
                            {
                                inner: {value: '5'},
                            },]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same text array greater size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                                inner: {value: '9'},
                            },
                            {
                                inner: {value: '2'},
                            },
                            {
                                inner: {value: '3'},
                            },
                            {
                                inner: {value: '4'},
                            },
                            {
                                inner: {value: '5'},
                            },]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch different text array greater size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            {
                                value: '88',
                            },
                            {
                                value: '000',
                            },
                            {
                                value: '66',
                            },
                            {
                                value: '55',
                            },
                        ]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch different inner text array same size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            {
                                value: '88',
                            },
                            {
                                value: '77',
                            },
                            {
                                value: '66',
                            },
                            {
                                value: '55',
                            },
                        ]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same inner text array same size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            {
                                value: '88',
                            },
                            {
                                value: '77',
                            },
                            {
                                value: '66',
                            },
                            {
                                value: '55',
                            },
                            {
                                value: '34534',
                            },
                        ]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same inner text array greater size
                </button>
                <br/>
                <button onClick={() => {
                    const fetchedData: DataModel = {
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
                            {
                                value: '88',
                            },
                            {
                                value: '77',
                            },
                            {
                                value: '66',
                            },
                        ]
                    };
                    this.merge(fetchedData);
                }}>
                    fetch same inner text array less size
                </button>
                <br/>
            </div>
        )
    }
}


export default App
