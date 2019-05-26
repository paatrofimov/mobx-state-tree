import React from "react"
import { inject, observer } from "mobx-react"
import { devLogVerbose } from ".."
import { default as Fio } from "./Fio"
import { PersonImpl } from "./MyStore"
import { HasValue } from "./App"

@inject(stores => stores)
@observer
@devLogVerbose
export default class Person extends React.Component<HasValue<PersonImpl>> {
    render() {
        const { value } = this.props

        return (
            <div className="view">
                <Fio value={value.fio}/>
            </div>
        )
    }
}
