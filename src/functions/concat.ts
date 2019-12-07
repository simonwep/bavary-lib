import {ParsingFunction} from '@bavary/core/src/core/compiler/types';

export const concat = (({setProperty}, a, b, tag): boolean => {

    if (typeof tag !== 'undefined' && (typeof tag !== 'string' || !tag)) {
        throw new Error('Tag must be a string and cannot be empty.');
    }

    if (Array.isArray(a) && Array.isArray(b)) {

        if (tag) {
            setProperty(tag, [...a, ...b]);
        } else {
            a.push(...b);
        }

    } else if (typeof a === 'string' && typeof b === 'string') {

        if (!tag) {
            throw new Error('String concatenation requires a tag.');
        }

        setProperty(tag, a + b);
    } else if (typeof a === 'object' && typeof b === 'object') {

        if (tag) {
            setProperty(tag, {...a, ...b});
        } else {
            Object.assign(a, b);
        }

    } else {
        throw new Error('Argument mismatch. The first values must both be either a an array, string or object.');
    }

    return true;
}) as ParsingFunction;
