import {ENV_VERSION}        from './env';
import {concat}             from './functions/concat';
import {count}              from './functions/count';
import {ignore}             from './functions/ignore';
import {ParsingFunctionSet} from './types';

/**
 * Current version
 */
export const version = ENV_VERSION;

// Functions
export const functions = Object.freeze({
    ignore,
    concat,
    count
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
