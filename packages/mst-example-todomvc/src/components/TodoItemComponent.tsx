import React from "react"
import {observerComponent} from "./ObserverComponentDecorator";
import StringInput from "./StringInput";
import {TodoItem} from "./DataStore";
import {bindChildWithChange, BindingProps} from "./Binding";

@observerComponent
export default class TodoItemComponent extends React.Component<BindingProps<TodoItem>> {
    render() {
        return (
            <div className="view">
                <StringInput {...bindChildWithChange(this.props, x => x.text!)}/>
            </div>
        )
    }
}
