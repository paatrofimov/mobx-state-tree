import { inject, observer } from "mobx-react"
import React from "react"
import { devLogVerbose } from ".."
import Person from "./Person"
import { Data, MyStore } from "./MyStore"
import TodoItem from "./TodoItem"

export interface HasValue<Value> {
    value: Value;
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
    render(): JSX.Element {
        return (
            <div>
                <Person value={this.props.store.Data.person}/>
                <TodoItem value={this.props.store.Data.todo}/>
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
                    this.props.store.Data = fetchedData
                }}>
                    fetch same data
                </button>
            </div>
        )
    }
}

export default App
