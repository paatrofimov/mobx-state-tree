import React from "react"
import { inject, observer } from "mobx-react"
import { devLogVerbose } from ".."
import { ChangableValue } from "./App"
import { TodoItemImpl } from "./MyStore"

@inject(stores => stores)
@observer
@devLogVerbose
export default class TodoItem extends React.Component<ChangableValue<TodoItemImpl>> {
    render() {
        const { value } = this.props

        return (
            <div className="view">
                <input
                    value={value.text}
                />
            </div>
        )
    }
}
