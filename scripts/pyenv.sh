#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$SCRIPT_DIR/../"

configure_python_env() {
  if command -v pyenv 1>/dev/null 2>&1; then
    eval "$(pyenv init -)"
    pyenv activate $(aws_environment)
    export AWS_PROFILE=$(aws_environment)
  else
    echo "Could not initialize pyenv"
    exit 1
  fi
}

function aws_environment() {
  cat $ROOT_DIR/.aws_environment
}
