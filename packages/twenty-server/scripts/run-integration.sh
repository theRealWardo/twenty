#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/set-env-test.sh

yarn nx database:init twenty-server
yarn jest --config ./test/jest-e2e.json
