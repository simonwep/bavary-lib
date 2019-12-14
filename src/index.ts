import {ENV_VERSION}        from './env';
import {concat}             from './functions/concat';
import {count}              from './functions/count';
import {defineProperty}     from './functions/define-property';
import {deleteProperty}     from './functions/delete-property';
import {expectEqual}        from './functions/expect-equal';
import {ignore}             from './functions/ignore';
import {pick}               from './functions/pick';
import {ParsingFunctionSet} from './types';

/**
 * Current version
 */
export const version = ENV_VERSION;

// Functions
export const functions = Object.freeze({
    defineProperty,
    deleteProperty,
    expectEqual,
    ignore,
    concat,
    count,
    pick
});

// Util to specify functions you want to use as array
export const use = (names: Array<keyof typeof functions>): ParsingFunctionSet => {
    const set = {} as ParsingFunctionSet;

    for (const name of names) {
        if (name in functions) {
            set[name] = functions[name];
        } else {
            throw new Error(`Unknown function: ${name}`);
        }
    }

    return set;
};
