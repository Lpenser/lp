#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
rm -rf release


echo 'Bundling to es module of amd'
export ROLLUP_TARGET=esm
$(npm bin)/rollup -c


echo 'Copying package.json'
cp package.json release/package.json
