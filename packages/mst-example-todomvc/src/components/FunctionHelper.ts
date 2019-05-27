export class FunctionHelper {
    public static getArrowFunctionBody(f: Function): string {
        const matches = f.toString().match(/^function\s*[^(]*\([^\(\))]+\)\s*\{\s*("use strict";\s*)?return\s*(.*?);?\s*\}$/m);
        if (!matches) {
            throw `Incorrect arrow function '${f.toString()}'`;
        }
        let result = matches[2];
        return result.split('.').slice(1).join(".");
    }

    public static blessArrayFunc<TRoot = any, T = any>(path: (v: TRoot) => T[], index: number): (v: TRoot) => T {
        return new Function("p", `return p.${FunctionHelper.getArrowFunctionBody(path)}[${index}]`) as any;
    }

    public static blessArrayBaseFunc<TRoot, TNode, T>(basePath: (v: TRoot) => TNode, funcPath: (v: TNode) => T[], index: number): (v: TRoot) => T {
        return new Function("p", `return p.${FunctionHelper.getArrowFunctionBody(basePath)}.${FunctionHelper.getArrowFunctionBody(funcPath)}[${index}]`) as any;
    }

    public static concatPaths<TRoot, TNode, T>(basePath: (v: TRoot) => TNode, funcPath: (v: TNode) => T): (v: TRoot) => T {
        const left = FunctionHelper.getArrowFunctionBody(basePath);
        const right = FunctionHelper.getArrowFunctionBody(funcPath);
        const body = right
            ? `return p.${left}.${right}`
            : `return p.${left}`;
        return new Function("p", body) as any;
    }

    public static getPath<TRoot, TNode, T>(basePath: (v: TRoot) => TNode, funcPath?: (v: TNode) => T) {
        let base = FunctionHelper.getArrowFunctionBody(basePath);
        if (!funcPath) {
            return base;
        }
        let func = (base == "" ? "" : ".") + FunctionHelper.getArrowFunctionBody(funcPath);
        if (func == ".")
            func = "";

        return base + func;
    }
}

