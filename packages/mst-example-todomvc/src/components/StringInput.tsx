import React from "react"
import {inject, observer} from "mobx-react"
import {devLogVerbose} from ".."
import {BindingProps} from "./App"
import * as _ from "lodash";
import {FunctionHelper} from "./FunctionHelper";

@inject(stores => stores)
@observer
@devLogVerbose
export default class StringInput extends React.Component<BindingProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> {
    render() {
        const {bindingRoot, onChange, bindingPath} = this.props

        const value = _.get(bindingRoot, FunctionHelper.getPath(bindingPath));

        return (
            <div className="view">
                <input value={value} onChange={onChange}/>
            </div>
        )
    }
}
