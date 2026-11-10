#!/usr/bin/env bash
set -eux

npm install -g aws-cdk
npm install -g typescript
cdk --version
aws --version
terraform version
sudo apt-get update
sudo apt-get install -y tree

if [ -d "s3/sdk/typescript" ]; then
  npm --prefix s3/sdk/typescript install
else
  echo "Directory s3/sdk/typescript does not exist; skipping npm install."
fi
