#!/bin/bash

oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS --insecure-skip-tls-verify=true
oc project myskills
exitcode=0
if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  oc rollout latest api-ci
  exitcode=$?
fi

if [[ ! -z "$TRAVIS_TAG" ]]; then
  oc rollout latest api-test
  exitcode=$?
fi

oc logout
exit $exitcode
