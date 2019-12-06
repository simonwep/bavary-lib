import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {count}   from '../../src/functions/count';

describe('[Function] count(val, tag)', () => {

    it('Should properly determine the length of arrays and strings', () => {
        const parse = compile(`
            <num> = [(0 - 9)]+
            <char> = [(a - z)+]

            entry [
                count(<num>, nums)
                count(<char>, chars)
            ]
        `, {functions: {count}});

        expect(parse('123456abcdefabcdef')).to.deep.equal({
            nums: 6,
            chars: 12
        });
    });

    it('Should throw an error if target is not an array / string', () => {
        const parse = compile(`
            <submum> = [(0 - 9)]+
            <num> = [<submum#num>]

            entry [count(<num>, nums)]
        `, {functions: {count}});

        expect(() => parse('12354')).to.throw();
    });

    it('Should throw an error if tag is missing', () => {
        const parse = compile(`
            <num> = [(0 - 9)]+

            entry [count(<num>)]
        `, {functions: {count}});

        expect(() => parse('12354')).to.throw();
    });
});
