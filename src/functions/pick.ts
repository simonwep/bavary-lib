import {ParsingFunction, ParsingResultObject} from '@bavary/core/lib/types/compiler/types';

export const pick: ParsingFunction = ({setString}, obj, toPick): boolean => {

    // Source needs to be a object
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('First argument needs to be an object.');
    }

    if (typeof toPick !== 'string') {
        throw new Error('Second argument needs to be a string or identifier.');
    } else if (typeof (obj as ParsingResultObject)[toPick] !== 'string') {
        throw new Error(`Target property "${toPick}" isn't a string or does not exist.`);
    }

    // Copy value to current scope
    setString((obj as ParsingResultObject)[toPick] as string);
    return true;
};
