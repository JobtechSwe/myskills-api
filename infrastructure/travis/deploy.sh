#!/bin/bash

oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS --insecure-skip-tls-verify=true
oc project myskills

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  exitcode=$(oc rollout latest api-ci)
fi

if [[ ! -z "$TRAVIS_TAG" ]]; then
  exitcode=$(oc rollout latest api-test)
fi

oc logout
exit $exitcode
