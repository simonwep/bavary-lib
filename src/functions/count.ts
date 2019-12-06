import {ParsingFunction} from '@bavary/core/src/core/compiler/types';

export const count = (({setProperty}, res, tag): boolean => {

    // Validate args
    if (!Array.isArray(res) && typeof res !== 'string') {
        throw new Error('Expected array or string as first argument.');
    } else if (!tag || typeof tag !== 'string') {
        throw new Error('Missing tag as second argument.');
    }

    setProperty(tag, res.length);
    return true;
}) as ParsingFunction;
