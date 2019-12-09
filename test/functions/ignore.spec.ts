import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {ignore}  from '../../src/functions/ignore';

describe('[Function] ignore(...groups)', () => {

    it('Should ignore groups passed to ignore', () => {
        const parse = compile(`
            entry [
                ignore(['('])
                [(0 - 9)+]
                ignore([')'])
            ]
        `, {functions: {ignore}});

        expect(parse('(1231231)')).to.equal('1231231');
    });
});
