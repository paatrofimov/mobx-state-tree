import React from "react"
import {inject, observer} from "mobx-react"
import {devLogVerbose} from ".."
import {BindingProps, bindPath} from "./App"
import StringInput from "./StringInput";
import {Fio, Person} from "./MyStore";
import * as _ from "lodash";
import {FunctionHelper} from "./FunctionHelper";

@inject(stores => stores)
@observer
@devLogVerbose
export default class FioComponent extends React.Component<BindingProps<Person>> {

    render() {
        const {bindingRoot, bindingPath} = this.props;

        const fio: Fio = _.get(bindingRoot, FunctionHelper.getPath(bindingPath));

        return (
            <div className="view">
                <StringInput bindingRoot={fio}
                             bindingPath={bindPath<Fio>(x => x.name)}
                />
                <StringInput bindingRoot={fio}
                             bindingPath={bindPath<Fio>(x => x.patronymic)}
                />
                <StringInput bindingRoot={fio}
                             bindingPath={bindPath<Fio>(x => x.surname)}
                />
            </div>
        )
    }
}
