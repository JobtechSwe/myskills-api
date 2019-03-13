#!/bin/sh
set -ex
sudo mkdir /tmp/openshift
sudo wget -qO- https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz | tar xvzf - -C /tmp/openshift --strip-components=1
sudo export PATH=$PATH:/tmp/openshift
