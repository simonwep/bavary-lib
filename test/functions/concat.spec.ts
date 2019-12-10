import {compile} from '@bavary/core';
import {expect}  from 'chai';
import {use}     from '../../src';

describe('[Function] concat(a, b, tag?)', () => {

    it('Should concat strings', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <char> = [(a - z)+]

            entry [
                concat(<num>, <char>, res)
            ]
        `, {functions: use(['concat'])});

        expect(parse('123abc')).to.deep.equal({
            res: '123abc'
        });
    });

    it('Should concat arrays', () => {
        const parse = compile(`
            <num> = [(0 - 9)]+
            <char> = [(a - z)]+

            entry [
                concat(<num>, <char>, res)
            ]
        `, {functions: use(['concat'])});

        expect(parse('123abc')).to.deep.equal({
            res: ['1', '2', '3', 'a', 'b', 'c']
        });
    });

    it('Should concat arrays inline', () => {
        const parse = compile(`
            <num> = [(0 - 9)]+
            <char> = [(a - z)]+

            entry [
                <num#vals>
                concat(#vals, <char>)
            ]
        `, {functions: use(['concat'])});

        expect(parse('123abc')).to.deep.equal({
            vals: ['1', '2', '3', 'a', 'b', 'c']
        });
    });

    it('Should concat objects', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <char> = [(a - z)+]
            <numobj> = [<num#num>]
            <charobj> = [<char#char>]

            entry [
                concat(<numobj>, <charobj>, res)
            ]
        `, {functions: use(['concat'])});

        expect(parse('123abc')).to.deep.equal({
            res: {
                num: '123',
                char: 'abc'
            }
        });
    });

    it('Should concat objects inline', () => {
        const parse = compile(`
            <num> = [(0 - 9)+]
            <char> = [(a - z)+]
            <numobj> = [<num#num>]
            <charobj> = [<char#char>]

            entry [
                <numobj#val>
                concat(#val, <charobj>)
            ]
        `, {functions: use(['concat'])});

        expect(parse('123abc')).to.deep.equal({
            val: {
                num: '123',
                char: 'abc'
            }
        });
    });

    it('Should throw an error if tag is invalid', () => {
        expect(() => compile(`

            entry [
                concat([(0 - 9)], [(a - z)], [])
            ]
        `, {functions: use(['concat'])})('2a')).to.throw();
    });

    it('Should throw an error if string-concatenation is done without a tag', () => {
        expect(() => compile(`

            entry [
                concat([(0 - 9)], [(a - z)])
            ]
        `, {functions: use(['concat'])})('2a')).to.throw();
    });

    it('Should throw an error if arguments don\'t match', () => {
        expect(() => compile(`

            entry [
                concat([(0 - 9)], [(a - z)]+)
            ]
        `, {functions: use(['concat'])})('2aaa')).to.throw();
    });

    it('Should throw an error if arguments are missing', () => {
        expect(() => compile(`

            entry [
                concat([(0 - 9)])
            ]
        `, {functions: use(['concat'])})('2aaa')).to.throw();
    });
});
