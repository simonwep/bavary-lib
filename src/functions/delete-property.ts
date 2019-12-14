import {ParsingFunction} from '@bavary/core/lib/types/compiler/types';

/**
 * Removes properties by their name
 * @param props properties to remove
 */
export const deleteProperty: ParsingFunction = ({state}, ...props) => {
    const {pure, obj} = state;

    if (pure) {
        throw new Error('Cannot use deleteProperty on string');
    }

    for (let i = 0; i < props.length; i++) {
        const prop = props[i];

        if (typeof prop !== 'string') {
            throw new Error(`Property at index ${i} is not a string.`);
        } else if (!(prop in obj)) {
            throw new Error(`Property ${prop} not found.`);
        }

        delete obj[prop];
    }

    return true;
};
