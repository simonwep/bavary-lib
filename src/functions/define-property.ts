import {ParsingFunction} from '@bavary/core/lib/types/compiler/types';

/**
 * Defines a new properties
 * @param setProperty
 * @param tag Property name
 * @param values Values, if more than one an array is used
 */
export const defineProperty: ParsingFunction = ({setProperty}, tag, ...values) => {

    if (typeof tag !== 'string' || !tag) {
        throw new Error('First argument must be a string and not empty.');
    }

    if (values.length > 1) {
        setProperty(tag, values);
    } else {
        setProperty(tag, values.length ? values[0] : null);
    }

    return !values.some(value => value === null);
};
