#!/usr/bin/env bash

cd $(dirname $0)

mocha \
  --reporter spec \
  --full-trace \
  --compilers js:meteor-babel/register \
  tests.js