/// COPYRIGHT https://github.com/unclechu/node-deep-extend/blob/master/lib/deep-extend.js

/// МОДИФИЦИРОВАНА ЧАСТЬ МЕРДЖА МАССИВА.
/// В ОРИГИНАЛЕ ВЕСЬ МАССИВ КЛОНИРУЕТСЯ ВСЕГДА.
/// В МОДИФИКАЦИИ ЕСЛИ ДЛИНЫ ИСХОДНОГО МАССИВА И НОВОГО РАВНЫ, ТО МЕРДЖ ПРОИСХОДИТ IN-PLACE, БЕЗ КЛОНИРОВАНИЯ МАССИВОВ, ЧТО ПОЗВОЛЯЕТ СЭКОНОМИТЬ НА РЕРЕНДЕРАХ ТЕХ ITEM'ОВ МАССИВА, КОТОРЫЕ НЕ ИЗМЕНИЛИСЬ.

import {toJS} from "mobx";

export function isSpecificValue(val: any) {
    return (
        val instanceof Buffer
        || val instanceof Date
        || val instanceof RegExp
    ) ? true : false;
}

function cloneSpecificValue(val: any) {
    if (val instanceof Buffer) {
        var x = Buffer.alloc
            ? Buffer.alloc(val.length)
            : new Buffer(val.length);
        val.copy(x);
        return x;
    } else if (val instanceof Date) {
        return new Date(val.getTime());
    } else if (val instanceof RegExp) {
        return new RegExp(val);
    } else {
        throw new Error('Unexpected situation');
    }
}

function deepExtendArray(target: any, key: string, arr: any[]) {
    if (!target[key] && arr) {
        target[key] = [];
    }
    const src = target[key];
    if (arr && arr.length === src.length) {
        for (let index = 0; index < arr.length; index++) {
            const target = src[index];
            const value = arr[index];
            if (typeof target === 'object' && target !== undefined && target !== null) {
                deepExtend(target, value);
            } else {
                src.push(toJS(value));
            }
        }
    }
    else {
        target[key].replace(toJS(arr));
    }
}

function safeGetProperty(object: any, property: any) {
    return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export function deepExtend(...args: any[]) {
    if (args.length < 1 || typeof args[0] !== 'object') {
        return false;
    }

    if (args.length < 2) {
        return args[0];
    }

    var target = args[0];

    // convert arguments to array and cut off target object
    var args1 = Array.prototype.slice.call(args, 1);

    var val, src;

    args1.forEach(function (obj: any) {
        // skip argument if isn't an object, is null, or is an array
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return;
        }

        Object.keys(obj).forEach(function (key) {
            src = safeGetProperty(target, key); // source value
            val = safeGetProperty(obj, key); // new value

            // recursion prevention
            if (val === target) {
                return;

                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            } else if (typeof val !== 'object' || val == null) {
                target[key] = val;
                return;

            } else if (Array.isArray(val)) {
                deepExtendArray(target, key, val);
                return;

                // custom cloning and overwrite for specific objects
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;

                // overwrite by new value if source isn't object or array
            } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;

                // source value and new value is objects both, extending...
            } else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });

    return target;
};
