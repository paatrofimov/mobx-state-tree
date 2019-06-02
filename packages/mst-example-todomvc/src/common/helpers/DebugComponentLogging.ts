import * as React from "react";
import {BindingProps} from "../../components/Binding";
import {FunctionHelper} from "../../components/FunctionHelper";

export let loggingEnabled = true;
export function disableLogging() {
    loggingEnabled = false;
}

export function devLogVerbose(Component: React.ComponentClass<any>) {
    const oldRender = Component.prototype.render;
    Component.prototype.render = function () {
        log(Component, this.props, 'render');
        return oldRender.apply(this)
    }

    const oldWillReceiveProps = Component.prototype.componentWillReceiveProps;
    Component.prototype.componentWillReceiveProps = function (nextProps: any) {
        log(Component, this.props, 'componentWillReceiveProps (current props)');
        log(Component, nextProps, 'componentWillReceiveProps (next props)');
        if (oldWillReceiveProps)
            return oldWillReceiveProps.apply(this)
    }

    const oldForceUpdate = Component.prototype.forceUpdate
    Component.prototype.forceUpdate = function () {
        log(Component, this.props, 'forceUpdate');
        return oldForceUpdate.apply(this)
    }

    const oldWillUnmount = Component.prototype.componentWillUnmount;
    Component.prototype.componentWillUnmount = function () {
        log(Component, this.props, 'componentWillUnmount');
        if (oldWillUnmount)
            return oldWillUnmount.apply(this)
    }

    const willMount = Component.prototype.componentWillMount;
    Component.prototype.componentWillMount = function () {
        log(Component, this.props, 'componentWillMount');
        if (willMount)
            return willMount.apply(this)
    }

    const didMount = Component.prototype.componentDidMount;
    Component.prototype.componentDidMount = function () {
        log(Component, this.props, 'componentDidMount');
        if (didMount)
            return didMount.apply(this)
    }
}

function getBindingPathStringParts(props: BindingProps) {
    const {bindingPath} = props;
    const maybeBindingPath = bindingPath && FunctionHelper.getPath(bindingPath);
    if (!maybeBindingPath) {
        return [];
    }

    return ['/ bindingPath:', maybeBindingPath];
}

function log(Component: React.ComponentClass<any>, props: BindingProps, method: string) {
    console.table(method, new Date().toISOString(), Component.name, ...getBindingPathStringParts(props), '/ props:', props);
}