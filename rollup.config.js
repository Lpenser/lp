import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import {uglify} from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve' 
import typescript from 'rollup-plugin-typescript';
// import fs from 'fs';

const getPath = _path => path.resolve(__dirname, _path)
const extensions = [
    '.js',
    '.ts',
    '.tsx'
]
// let entry = [];
// const getPackagesFiles = () => {
//     fs.readdir(getPath('./packages'), ((err, files) => {
//         console.log(files);
//         entry = files.filter(it => it !== 'tsconfig.json').map(file => `packages/${file}`)
//     }))
// }
// getPackagesFiles();
// ts

export default {
    input: {
        print: 'packages/print/index.ts',
        xlsx: 'packages/xlsx/index.ts',
        tree: 'packages/tree/index.ts',
    },
    output:{
        dir: 'release/lp',
        format: 'amd', 
    },
    plugins: [
        commonjs(),
        babel({
          exclude: ['node_modules/**' ,'packages/xlsx/**']
        }),
        uglify(),
        resolve(extensions),
        typescript(),
    ]
}