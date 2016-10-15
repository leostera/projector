#!/bin/bash -e

pushd node_modules
  rm -f ./projector
  ln -s ../src ./projector
popd
