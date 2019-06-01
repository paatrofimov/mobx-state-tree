import * as _ from "lodash";
import {FunctionHelper} from "./FunctionHelper";

export interface BindingProps<BoundValue = any, Root = any> {
    bindingRoot?: Root;
    bindingPath?: (root: Root) => BoundValue;
}

export interface BindingPropsWithChange<BoundValue = any, BindingRoot = any>  extends BindingProps<BoundValue, BindingRoot> {
    onChange?: (v: BoundValue) => any;
}

export function bind<Root = any, Value = any>(bindingRoot: Root,
                                              bindingPath: (x: Root) => Value): BindingProps<Value, Root> {
    return {
        bindingRoot,
        bindingPath,
    };
}

export function bindWithChange<Root = any, Value = any>(bindingRoot: Root,
                                                        bindingPath: (x: Root) => Value,
                                                        customOnChange?: (v: Value) => void): BindingPropsWithChange<Value, Root> {
    return {
        bindingRoot,
        bindingPath,
        onChange: decoratedOnChange(bindingRoot, bindingPath, customOnChange),
    };
}

export function bindChild<Parent, Child>(props: BindingProps<Parent>,
                                         bindingPath: (x: Parent) => Child): BindingProps<Child, Parent> {
    const root = _.get(props.bindingRoot, FunctionHelper.getPath(props.bindingPath as any));

    logBind('bindChild', props.bindingRoot, props.bindingPath, root, props);

    return bind(root, bindingPath);
}

export function bindChildWithChange<Parent, Child>(props: BindingProps<Parent>,
                                                   bindingPath: (x: Parent) => Child,
                                                   customOnChange?: (v: Child) => void): BindingPropsWithChange<Child, Parent> {
    const root = _.get(props.bindingRoot, FunctionHelper.getPath(props.bindingPath as any));

    logBind('bindChildWithChange', props.bindingRoot, props.bindingPath, root, props);

    return bindWithChange(root, bindingPath, customOnChange);
}

export function getBoundValue<Root, BoundValue>(props: BindingProps<BoundValue, Root>): BoundValue {
    return getBoundValueInternal(props.bindingRoot!, props.bindingPath!);
}

function getBoundValueInternal<Root, BoundValue>(bindingRoot: Root, bindingPath: (x: Root) => BoundValue) {
    return _.get(bindingRoot, FunctionHelper.getPath(bindingPath));
}

function decoratedOnChange<Root, BoundValue>(bindingRoot: Root,
                                             bindingPath: (x: Root) => BoundValue,
                                             customOnChange?: (v: BoundValue) => void) {
    return function (v: BoundValue) {
        const path = FunctionHelper.getPath(bindingPath);
        _.set(bindingRoot as any, path, v);
        logBind('doneOnChangeBoundSet', bindingRoot, path, v);
        customOnChange && customOnChange(v);
    }
}

function logBind(method: string,
                 bindingRoot: any,
                 bindingPath: any,
                 boundValue: any,
                 props?: any) {
    const propsInternal = props && ['/ props:', props] || [];
    console.table(method, new Date().toISOString(), '/ bindingPath', bindingPath, '/ boundValue', boundValue, '/ bindingRoot', bindingRoot, ...propsInternal);
}