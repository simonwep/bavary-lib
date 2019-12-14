import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../../src';

describe('[Function] defineProperty(tag, ..values)', () => {

    it('Should save a simple value into a property', () => {
        const parse = compile(`
            entry [
                defineProperty(value, [
                    (A - Z, a - z)+
                ])
            ]
        `, {functions: use(['defineProperty'])});

        expect(parse('ABC123')).to.equal(null);
        expect(parse('ABCabc')).to.deep.equal({
            value: 'ABCabc'
        });
    });

    it('Should wrap values into an array if more than one argument is provided', () => {
        const parse = compile(`
            entry [
                defineProperty(
                    value,
                    [(A - Z, a - Z)+],
                    [(0 - 9)+]
                )
            ]
        `, {functions: use(['defineProperty'])});

        expect(parse('abc')).to.equal(null);
        expect(parse('ABC123')).to.deep.equal({
            value: ['ABC', '123']
        });
    });

    it('Should throw an error if the tag is missing', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <wrapped-num> = [<num#num>]
            entry [
                defineProperty(
                    <wrapped-num>,
                    [(A - Z, a - Z)+]
                )
            ]
        `, {functions: use(['defineProperty'])});

        expect(() => parse('123ABC')).to.throw();
    });

    it('Should set the property to null if no value where passed into it', () => {
        const parse = compile(`
            entry [
                defineProperty(hi)
            ]
        `, {functions: use(['defineProperty'])});

        expect(parse('')).to.deep.equal({
            hi: null
        });
    });
});
