import {ParsingFunction} from '@bavary/core/lib/types/compiler/types';

/**
 * Saves the length or size of an array / string into an tag.
 * @param source String or array
 * @param tag Target property
 */
export const count: ParsingFunction = ({setProperty}, source, tag): boolean => {

    if (source === null) {
        return false;
    }

    // Validate args
    if (!Array.isArray(source) && typeof source !== 'string') {
        throw new Error('Expected array or string as first argument.');
    } else if (!tag || typeof tag !== 'string') {
        throw new Error('Missing tag as second argument.');
    }

    setProperty(tag, source.length);
    return true;
};
