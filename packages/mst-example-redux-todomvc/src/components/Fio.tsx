import React from "react"
import { inject, observer } from "mobx-react"
import { devLogVerbose } from ".."
import { FioImpl } from "./MyStore"
import { ChangableValue } from "./App"

@inject(stores => stores)
@observer
@devLogVerbose
export default class Fio extends React.Component<ChangableValue<FioImpl>> {

    render() {
        const { value } = this.props

        return (
            <div className="view">
                <input value={value.name}
                       onChange={(v) => value.name = v.target.value}
                />
                <input value={value.surname}
                       onChange={(v) => value.surname = v.target.value}
                />
                <input value={value.patronymic}
                       onChange={(v) => value.patronymic = v.target.value}
                />
            </div>
        )
    }
}
