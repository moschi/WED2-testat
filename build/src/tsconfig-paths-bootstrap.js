"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var tsConfig = require('../tsconfig.json');
var tsConfigPaths = require('tsconfig-paths');
var baseUrl = '../build';
tsConfigPaths.register({
    baseUrl: baseUrl,
    paths: tsConfig.compilerOptions.paths,
});
