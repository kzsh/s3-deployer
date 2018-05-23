#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$SCRIPT_DIR/../"
NODE_VERSION="$(cat "$ROOT_DIR/.nvmrc")"

function configure_node_env() {
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # this loads nvm
  if ! is_node_version_installed; then
    echo "RUN: Install $NODE_VERSION"
    install_missing_nvm
    echo "RUN COMPLETE: Install $NODE_VERSION"
  else
    echo "SKIP: install.  node $NODE_VERSION is already installed"
  fi

  nvm use

}

function is_node_version_installed() {
  nvm list | grep -q $NODE_VERSION
}


function install_missing_nvm() {
  nvm install $NODE_VERSION
}

