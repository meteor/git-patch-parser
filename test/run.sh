#!/usr/bin/env bash

cd $(dirname $0)

mocha \
  --reporter spec \
  --full-trace \
  --compilers js:babel/register \
  tests.js