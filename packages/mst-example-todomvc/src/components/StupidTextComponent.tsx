import React from "react"
import {observerComponent} from "./ObserverComponentDecorator";
import {InnerStupidText, StupidText} from "./DataStore";
import {bind, bindChild, BindingProps, BindingPropsWithChange, bindWithChange, getBoundValue} from "./Binding";

@observerComponent
export class StupidTextComponent extends React.Component<BindingProps<InnerStupidText>> {
    render() {
        return (<>
                <br/>
                <>stupid text</>
                <StupidTextInnerComponent {...bindChild(this.props, t => t.value!)}/>
            </>
        )
    }
}

@observerComponent
export class StupidTextInnerComponent extends React.Component<BindingPropsWithChange<string>> {
    render() {
        return (<>
                <br/>
                <>inner stupid text</>
                <input className="view" value={getBoundValue(this.props)}
                       onChange={event1 => this.props.onChange!(event1.target.value)}>
                </input>
                <br/>
            </>
        )
    }
}

@observerComponent
export class StupidTextArrayComponent extends React.Component<BindingProps<Array<StupidText>>> {
    render() {
        return (
            <div className="view">
                {
                    (
                        getBoundValue(this.props)!
                            .map(t =>
                                <StupidTextComponent {...bind(t, t => t.inner!)}/>
                            )
                    )
                }
            </div>
        )
    }
}

@observerComponent
export class StupidInnerTextArrayComponent extends React.Component<BindingProps<Array<InnerStupidText>>> {
    render() {
        return (
            <div className="view">
                {
                    (
                        getBoundValue(this.props)!
                            .map(t =>
                                <StupidTextInnerComponent {...bindWithChange(t, t => t.value!)}/>
                            )
                    )
                }
            </div>
        )
    }
}
