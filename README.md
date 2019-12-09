<h3 align="center">
    <img src="https://user-images.githubusercontent.com/30767528/70376518-fa1fa780-1909-11ea-815a-b2b8637b16f9.png" alt="Logo">
</h3>

<br>

<p align="center">
    <a href="https://travis-ci.org/Simonwep/bavary-lib"><img
       alt="Build Status"
       src="https://img.shields.io/travis/Simonwep/bavary-lib.svg?style=flat-square"></a>
    <a href='https://coveralls.io/github/Simonwep/bavary-lib?branch=master'><img
       src='https://img.shields.io/coveralls/github/Simonwep/bavary-lib?style=flat-square'
       alt='Coverage Status'/></a>
    <a href="https://www.npmjs.com/package/@bavary/lib"><img
       alt="Download count"
       src="https://img.shields.io/npm/dm/@bavary/lib.svg?style=flat-square"></a>
    <img alt="Current version" src="https://img.shields.io/github/tag/Simonwep/bavary-lib.svg?color=21068E&label=version&style=flat-square">
    <a href="https://github.com/sponsors/Simonwep"><img
       alt="Support me"
       src="https://img.shields.io/badge/github-support-387eff.svg?style=flat-square"></a>
</p>

> Checkout [related packages](#related-packages)

Install via npm:
```shell
$ npm install -g @bavary/lib
```

Install via yarn:
```shell
$ yarn global add @bavary/lib
```

Include directly via jsdelivr:
```html
<script src="https://cdn.jsdelivr.net/npm/@bavary/lib/lib/bavary.lib.js"></script>
```

## Usage
```js
import {

    /**
     * Custom functions crafted for @bavary/core.
     * Checkout the available-functions section for more info!
     */
    functions,

    /**
     * Pass an array of function-names you want to use.
     * Returns an object with functions.
     */
    use
} from '@bavary/lib';
```


#### Functions

> Checkout the source if you want to now exactly whats going on in each function!

* [ignore(...values)](src/functions/ignore.ts) _- Does nothing. Can be used to ignore the value of nested groups._
* [count(value, tag)](src/functions/count.ts) _- Saves the length of `value` (either array or string) into `tag`_
* [concat(a, b, tag?)](src/functions/concat.ts) _- Concatenates strings, arrays or objects.
If no tag is specified for objects and arrays the value will be appended to `a` (Via `.push` or `Object.assign`). The `tag` is mandatory for strings._


#### Related packages
* [@bavary/core](https://github.com/Simonwep/bavary) _- Parser and compiler._
* [@bavary/cli](https://github.com/Simonwep/bavary-cli) _- CLI with development server._
* [@bavary/lib](https://github.com/Simonwep/bavary-lib) _- Standard library with extensions for bavary._

