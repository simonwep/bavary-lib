import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../../src';

describe('[Function] deleteProperty(...props)', () => {

    it('Should save a simple value into a property', () => {
        const parse = compile(`
            entry [
                defineProperty(value, [(A - Z, a - z)+])
                defineProperty(value2, [(0 - 9)+])
                deleteProperty(value, value2)
            ]
        `, {
            functions: use([
                'defineProperty',
                'deleteProperty'
            ])
        });

        expect(parse('ABC123')).to.deep.equal({});
    });

    it('Should throw an error if a property is not defined in the current result', () => {
        const parse = compile(`
            entry [
                defineProperty(value, [(0 - 9)+])
                deleteProperty(val)
            ]
        `, {
            functions: use([
                'defineProperty',
                'deleteProperty'
            ])
        });

        expect(() => parse('123')).to.throw();
    });

    it('Should throw an error if current result is pure', () => {
        const parse = compile(`
            entry [
                [(A - Z)+]
                deleteProperty(value)
            ]
        `, {functions: use(['deleteProperty'])});

        expect(() => parse('ABC')).to.throw();
    });

    it('Should throw an error if there\'s an argument mismatch', () => {
        const parse = compile(`
            <str> = [(A - Z)+]

            entry [
                defineProperty(value, 'hi')
                deleteProperty([<str#string>])
            ]
        `, {
            functions: use([
                'defineProperty',
                'deleteProperty'
            ])
        });

        expect(() => parse('ABC')).to.throw();
    });
});
