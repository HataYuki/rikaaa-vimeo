/*jshint esversion: 8 */
const path = require('path');
const rollup = require('rollup');
const noderesolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const license = require('rollup-plugin-license');
const sass = require('./sass');

module.exports = async (filepath, polyfill, removeExternalArray,type) => {
    let inputOptions = {
        input: filepath,
        plugins: [
            noderesolve(),
            commonjs({
                include: /node_modules/,
            }),
            license({
                banner: {
                    file: path.join('./config', 'banner.txt'),
                    encoding: 'utf-8',
                }
            }),
        ]
    };

    const babelSetting = {
        exclude: 'node_modules/**',
        presets: [
            ['@babel/preset-env', {
                'targets': {
                    ie: '11',
                },
            }]
        ],
    }

    if (polyfill) {
        babelSetting.runtimeHelpers = true;
        babelSetting.plugins = [
            ['@babel/plugin-transform-runtime', {
                'corejs': 3
            }],
        ];
    }    

    inputOptions.plugins = inputOptions.plugins.concat([babel(babelSetting)]);
    

    if (removeExternalArray) inputOptions = Object.assign(inputOptions, {
        external: removeExternalArray,
    });

    const outputOptions = {
        // format: 'iife',
        format: type,
    };
    const bundle = await rollup.rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);

    if (output[0].code.match(/\$\{\{\{.*\}\}\}/g)) {
        const inputcssTarget = output[0].code.match(/\$\{\{\{.*\}\}\}/g)[0];
        const scssPath = inputcssTarget.replace('\$\{\{\{', '').replace('}}}', '');
        const csscode = await sass(scssPath);
        return output[0].code.replace(/\$\{\{\{.*\}\}\}/g, csscode.replace(/\n|\r\n|\r/g,''));
    } else {
        return output[0].code;
    }
};
