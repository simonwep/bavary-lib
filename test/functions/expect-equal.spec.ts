import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../../src';

describe('[Function] expectEqual(error-message | "null", ...values)', () => {

    it('Should silently check if values are equal', () => {
        const parse = compile(`
            <quote> = ['"' | "'"]
            <content> = [(A - Z, a - z)+]

            entry [
               <quote#quote>
               <content#body>
               expectEqual(null, <quote>, #quote)
            ]
        `, {functions: use(['expectEqual'])});

        expect(parse('\'Hello"')).to.equal(null);
        expect(parse('\'Hello\'')).to.deep.equal({
            quote: '\'',
            body: 'Hello'
        });
    });

    it('Should throw an error if msg isn\'t null', () => {
        const parse = compile(`
            <quote> = ['"' | "'"]
            <content> = [(A - Z, a - z)+]

            entry [
               <quote#quote>
               <content#body>
               expectEqual("Error Occurred", <quote>, #quote)
            ]
        `, {functions: use(['expectEqual'])});

        expect(() => parse('\'Hello"')).to.throw();
        expect(parse('\'Hello\'')).to.deep.equal({
            quote: '\'',
            body: 'Hello'
        });
    });

    it('Should throw an error if less than two arguments are defined', () => {
        expect(() =>
            compile(`
                <quote> = ['"' | "'"]
                <content> = [(A - Z, a - z)+]

                entry [
                   <quote#quote>
                   <content#body>
                   expectEqual("Error Occurred", <quote>)
                ]
            `, {functions: use(['expectEqual'])})('"ABC')
        ).to.throw();
    });

    it('Should throw an error if error message isn\' a string', () => {
        expect(() =>
            compile(`
                <quote> = ['"' | "'"]
                <content> = [(A - Z, a - z)+]

                entry [
                   <quote#quote>
                   <content#body>
                   expectEqual(<quote>)
                ]
            `, {functions: use(['expectEqual'])})('"ABC')
        ).to.throw();
    });
});
