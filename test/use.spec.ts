import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../src';

describe('[Util] use(...names)', () => {

    it('Should properly resolve functions', () => {
        const parse = compile(`
            <num> = [(0 - 9)]+
            <char> = [(a - z)]+

            entry [
                <num#nums>
                <char#chars>
                count(#nums, numcount)
                concat(#nums, #chars, total)
            ]
        `, {functions: use(['count', 'concat'])});

        expect(parse('12ab')).to.deep.equal({
            chars: ['a', 'b'],
            nums: ['1', '2'],
            numcount: 2,
            total: ['1', '2', 'a', 'b']
        });
    });

    it('Should throw an error if function cannot be found', () => {
        expect(() => use(['count', 'baz' as 'ignore'])).to.throw();
    });
});
