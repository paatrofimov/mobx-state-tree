import {inject, observer} from "mobx-react";
import * as React from "react";
import {devLogVerbose} from "../../helpers/DebugComponentLogging";
import {loggingEnabled} from "../../helpers/DebugComponentLogging";

export function observerComponent(Component: React.ComponentClass<any>) {
    loggingEnabled && devLogVerbose(Component);
    const loggedObserved = observer(Component);
    return inject((stores : any) => ({...stores}))(loggedObserved as any) as any;
}