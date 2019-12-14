import {ParsingFunction} from '@bavary/core/lib/types/compiler/types';

/**
 * Validates
 * @param msg
 * @param values
 */
export const expectEqual: ParsingFunction = (_, msg, ...values): boolean => {

    if (typeof msg !== 'string') {
        throw new Error('Error message must be a string. Use "null" to fail silently.');
    } else if (values.length < 2) {
        throw new Error('expectEqual requires at least two value to check equality.');
    }

    const value = values[0];
    for (let i = 0; i < values.length; i++) {
        const val = values[i];

        if (val !== value) {
            if (msg !== 'null') {
                throw new Error(msg);
            }

            return false;
        }
    }

    return true;
};
