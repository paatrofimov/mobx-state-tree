import React from "react"
import {default as FioComponent} from "./Fio"
import {Person} from "./DataStore";
import {bindChild, BindingProps} from "./Binding";
import {observerComponent} from "./ObserverComponentDecorator";

@observerComponent
export default class PersonComponent extends React.Component<BindingProps<Person>> {
    render() {
        return (
            <div className="view">
                <FioComponent {...bindChild(this.props, x => x.fio)}/>
            </div>
        )
    }
}
