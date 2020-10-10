#!/bin/bash

rm -rf {dist,build,src/renderer/.next,src/renderer/out}/ && \
npm run build:react && \
npm run build:electron:mac 
# && \

# if [ -x "$(command -v docker)" ]; then
#   docker run --rm \
#     --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
#     --env ELECTRON_CACHE="/root/.cache/electron" \
#     --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
#     -v ${PWD}:/project \
#     -v ${PWD##*/}-node-modules:/project/node_modules \
#     -v ~/.cache/electron:/root/.cache/electron \
#     -v ~/.cache/electron-builder:/root/.cache/electron-builder \
#     electronuserland/builder:wine \
#     /bin/bash -c "npm i && npm run build:react && npm run build:electron:win"

#   docker run --rm \
#     --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
#     --env ELECTRON_CACHE="/root/.cache/electron" \
#     --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
#     -v ${PWD}:/project \
#     -v ${PWD##*/}-node-modules:/project/node_modules \
#     -v ~/.cache/electron:/root/.cache/electron \
#     -v ~/.cache/electron-builder:/root/.cache/electron-builder \
#     electronuserland/builder:12 \
#     /bin/bash -c "npm i && npm run build:react && npm run build:electron:linux"
# fi
