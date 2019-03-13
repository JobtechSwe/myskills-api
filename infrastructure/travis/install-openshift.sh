#!/bin/sh
set -ex
mkdir /tmp/openshift
wget -qO- https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz | tar xvzf - -C /tmp/openshift --strip-components=1
export PATH=$PATH:/tmp/openshift
