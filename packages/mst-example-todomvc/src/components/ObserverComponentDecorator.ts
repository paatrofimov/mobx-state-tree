import {inject, observer} from "mobx-react";
import * as React from "react";
import {devLogVerbose, loggingEnabled} from "./DebugLogging";

export function observerComponent(Component: React.ComponentClass<any>) {
    loggingEnabled && devLogVerbose(Component);
    const loggedObserved = observer(Component);
    return inject(stores => stores)(loggedObserved) as any;
}