import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../../src';

describe('[Function] pick(value, property)', () => {

    it('Should return false if source is null', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <wrapper> = [<num#num>]

            entry [
                [pick(<wrapper>, num)]? 'A'
            ]
        `, {functions: use(['pick'])});

        expect(parse('A')).to.equal('A');
    });

    it('Should pick a value', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <quote> = ['"']
            <quoted-num> = [<quote#start> <num#num> <quote#end>]

            entry [
                pick(<quoted-num>, num)
            ]
        `, {
            functions: use(['pick'])
        });

        expect(parse('"123456"')).to.equal('123456');
    });

    it('Should throw an error if value isn\'t an object', () => {
        expect(() =>
            compile(`
                entry [
                    pick([(0 - 9)+], num)
                ]
            `, {functions: use(['pick'])})('123')
        ).to.throw();
    });

    it('Should throw an error if resolved value isn\'t an string', () => {
        expect(() =>
            compile(`
                <num> = [(0 - 9)+]
                <wrapped-num-2> = [<num#num>]
                <wrapped-num> = [<wrapped-num-2#num>]

                entry [
                    pick(<wrapped-num>, num)
                ]
            `, {functions: use(['pick'])})('123')
        ).to.throw();
    });

    it('Should throw an error if property isn\'t an string', () => {
        expect(() =>
            compile(`
                <num> = [(0 - 9)+]
                <char> = [(a - z)+]
                <wrapped-num> = [<num#num>]

                entry [
                    pick(<wrapped-num>, [<char#chars>])
                ]
            `, {functions: use(['pick'])})('123abc')
        ).to.throw();
    });
});
