#!/bin/bash

echo "$TRAVIS_BRANCH"
oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS