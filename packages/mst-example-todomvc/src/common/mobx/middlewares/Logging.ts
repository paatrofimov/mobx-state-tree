import {IMiddlewareHandler} from "mobx-state-tree/dist/core/action";

export const loggingMiddleware: IMiddlewareHandler = (call, next) => {
    console.groupCollapsed(`ACTION ${call.name}`);
    next(call, value => value + 1);
    console.groupEnd();
};