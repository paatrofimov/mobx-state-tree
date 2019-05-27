import React from "react"
import * as _ from "lodash"
import {inject, observer} from "mobx-react"
import {devLogVerbose} from ".."
import {default as FioComponent} from "./Fio"
import {Data, Person} from "./MyStore"
import {BindingProps, bindPath} from "./App"
import {FunctionHelper} from "./FunctionHelper";

@inject(stores => stores)
@observer
@devLogVerbose
export default class PersonComponent extends React.Component<BindingProps<Data>> {
    render() {
        const {bindingRoot, bindingPath} = this.props

        const person: Person = _.get(bindingRoot, FunctionHelper.getPath(bindingPath));

        return (
            <div className="view">
                <FioComponent bindingRoot={person} bindingPath={bindPath<Person>(x => x.fio)}/>
            </div>
        )
    }
}
