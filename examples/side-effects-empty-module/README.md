This example shows how the `sideEffects` flag for library authors works.

The example contains a large library, `big-module`. `big-module` contains multiple child modules: `a`, `b` and `c`. The exports from the child modules are re-exported in the entry module (`index.js`) of the library. A consumer uses **some** of the exports, importing them from the library via `import { a, b } from "big-module"`. According to the EcmaScript spec, all child modules _must_ be evaluated because they could contain side effects.

The `"sideEffects": false` flag in `big-module`'s `package.json` indicates that the package's modules have no side effects (on evaluation) and only expose exports. This allows tools like webpack to optimize re-exports. In the case `import { a, b } from "big-module-with-flag"` is rewritten to `import { a } from "big-module-with-flag/a"; import { b } from "big-module-with-flag/b"`.

The example contains two variants of `big-module`. `big-module` has no `sideEffects` flag and `big-module-with-flag` has the `sideEffects` flag. The example client imports `a` and `b` from each of the variants.

After being built by webpack, the output bundle contains `index.js` `a.js` `b.js` `c.js` from `big-module`, but only `a.js` and `b.js` from `big-module-with-flag`.

Advantages:

- Smaller bundles
- Faster boot up

# example.js

```javascript
_{{example.js}}_
```

# node_modules/big-module/package.json

```javascript
_{{node_modules/big-module/package.json}}_
```

# node_modules/big-module-with-flag/package.json

```javascript
_{{node_modules/big-module-with-flag/package.json}}_
```

# node_modules/big-module(-with-flag)/index.js

```javascript
_{{node_modules/big-module-with-flag/index.js}}_
```

# dist/output.js

```javascript
_{{dist/output.js}}_
```

# Info

## Unoptimized

```
_{{stdout}}_
```

## Production mode

```
Hash: 0a1b2c3d4e5f6a7b8c9d
Version: webpack 5.0.0-beta.16
Time: 246 ms
    Asset      Size
output.js  2.17 KiB  [emitted]  [name: main]
Entrypoint main = output.js
chunk output.js (main) 1.37 KiB (javascript) 1.25 KiB (runtime) [entry] [rendered]
    > ./example.js main
 ./example.js 117 bytes [built]
     [no exports]
     [no exports used]
     ModuleConcatenation bailout: Cannot concat with ./node_modules/big-module/index.js (<- Module exports are unknown)
     ModuleConcatenation bailout: Cannot concat with ./node_modules/module-with-export/index.js (<- Module exports are unknown)
     entry ./example.js main
 ./node_modules/big-module/a.js 60 bytes [built]
     [only some exports used: a]
     ModuleConcatenation bailout: Module exports are unknown
     [inactive] harmony side effect evaluation ./a ./node_modules/big-module/index.js 1:0-20
     harmony export imported specifier ./a ./node_modules/big-module/index.js 1:0-20
 ./node_modules/big-module/index.js 46 bytes [built]
     [only some exports used: a]
     ModuleConcatenation bailout: Module exports are unknown
     [inactive] harmony side effect evaluation big-module ./example.js 1:0-31
     harmony import specifier big-module ./example.js 5:1-2
 ./node_modules/big-module/log.js 97 bytes [built]
     ModuleConcatenation bailout: Module exports are unknown
     [inactive] harmony side effect evaluation ./log ./node_modules/big-module/index.js 2:0-22
     harmony export imported specifier ./log ./node_modules/big-module/index.js 2:0-22
     module decorator ./node_modules/big-module/log.js 3:0-6
 ./node_modules/module-with-export/emptyModule.js 43 bytes [built]
     ModuleConcatenation bailout: Module is not an ECMAScript module
     [inactive] harmony side effect evaluation ./emptyModule ./node_modules/module-with-export/index.js 3:0-30
     harmony export imported specifier ./emptyModule ./node_modules/module-with-export/index.js 3:0-30
 ./node_modules/module-with-export/index.js 1.02 KiB [built]
     ModuleConcatenation bailout: Module exports are unknown
     [inactive] harmony side effect evaluation module-with-export ./example.js 2:0-46
     harmony import specifier module-with-export ./example.js 6:1-9
     [inactive] harmony side effect evaluation module-with-export ./node_modules/big-module/a.js 1:0-35
     [inactive] harmony export imported specifier module-with-export ./node_modules/big-module/a.js 1:0-35
     [inactive] harmony side effect evaluation module-with-export ./node_modules/big-module/log.js 1:0-35
     harmony export imported specifier module-with-export ./node_modules/big-module/log.js 1:0-35
     + 5 hidden chunk modules
```
