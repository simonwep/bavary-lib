import {ENV_VERSION} from './env';
import {count}       from './functions/count';

/**
 * Current version
 */
export const version = ENV_VERSION;

// Functions
export const functions = {
    count
};
