import React from "react"
import {inject, observer} from "mobx-react"
import {devLogVerbose} from ".."
import {BindingProps, bindPath} from "./App"
import StringInput from "./StringInput";
import {Data, TodoItem} from "./MyStore";
import * as _ from "lodash";
import {FunctionHelper} from "./FunctionHelper";

@inject(stores => stores)
@observer
@devLogVerbose
export default class TodoItemComponent extends React.Component<BindingProps<Data>> {
    render() {
        const {bindingRoot, bindingPath} = this.props

        const item: TodoItem = _.get(bindingRoot, FunctionHelper.getPath(bindingPath));

        return (
            <div className="view">
                <StringInput bindingRoot={item} bindingPath={bindPath<TodoItem>(x => x.text)}/>
            </div>
        )
    }
}
