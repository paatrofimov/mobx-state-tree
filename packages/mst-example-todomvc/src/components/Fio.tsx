import React from "react"
import {observerComponent} from "./ObserverComponentDecorator";
import StringInput from "./StringInput";
import {Fio} from "./DataStore";
import {bindChildWithChange, BindingProps} from "./Binding";

@observerComponent
export default class FioComponent extends React.Component<BindingProps<Fio>> {
    render() {
        return (
            <div className="view">
                <StringInput {...bindChildWithChange(this.props, x => x.patronymic!)}/>
                <StringInput {...bindChildWithChange(this.props, x => x.surname!)}/>
                <StringInput {...bindChildWithChange(this.props, x => x.name!)}/>
            </div>
        )
    }
}
