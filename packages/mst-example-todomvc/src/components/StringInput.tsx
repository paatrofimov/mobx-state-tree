import React from "react"
import {observerComponent} from "./ObserverComponentDecorator";
import {BindingPropsWithChange, getBoundValue} from "./Binding";

@observerComponent
export default class StringInput extends React.Component<BindingPropsWithChange, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> {
    render() {
        const {onChange} = this.props;

        return (
            <div className="view">
                <input value={getBoundValue(this.props)} onChange={onChange}/>
            </div>
        )
    }
}
