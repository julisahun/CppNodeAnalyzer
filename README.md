Package to analyze c++ code.

This package was developed as a University final degree project, and it was develop for [Jutge.org](https://jutge.org)

Use this project anywhere you want but we warned that it was debugged for Jutge.org problems so you may encounter bugs.

Feel free to submit a PR with any fix you encounter

### Instalation:

```bash
$ npm i cpp-node-analyzer
```

```bash
$ yarn add cpp-node-analyzer
```

### Usage

```ts
import Analyzer from 'cpp-node-analyzer';
const cppNodeAnalyzer = new Analyzer();

const code = YOUR_CPP_CODE_STRING;

const result = cppNodeAnalyzer.analyze(code);
```

