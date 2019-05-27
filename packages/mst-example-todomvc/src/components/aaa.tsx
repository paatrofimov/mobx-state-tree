export function isSpecificValue(val : any) {
    return (
        val instanceof Buffer
        || val instanceof Date
        || val instanceof RegExp
    ) ? true : false;
}

function cloneSpecificValue(val : any) {
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

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr : any) {
    var clone : any = [];
    arr.forEach(function (item: any, index: any) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            } else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            } else {
                clone[index] = deepExtend({}, item);
            }
        } else {
            clone[index] = item;
        }
    });
    return clone;
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

    var val, src, clone;

    args1.forEach(function (obj: any) {
        // skip argument if isn't an object, is null, or is an array
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            console.log('return');
            return;
        }

        Object.keys(obj).forEach(function (key) {
            src = safeGetProperty(target, key); // source value
            val = safeGetProperty(obj, key); // new value

            console.log(key);
            // recursion prevention
            if (val === target) {
                return;

                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            } else if (typeof val !== 'object' || val == null) {
                console.log(1);
                target[key] = val;
                return;

                // just clone arrays (and recursive clone objects inside)
            } else if (Array.isArray(val)) {
                console.log(2);
                target[key] = deepCloneArray(val);
                return;

                // custom cloning and overwrite for specific objects
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;

                // overwrite by new value if source isn't object or array
            } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                console.log(3);
                target[key] = deepExtend({}, val);
                return;

                // source value and new value is objects both, extending...
            } else {
                console.log(4);
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });

    return target;
};
