#!/bin/bash
err=0
trap 'err=1' ERR

oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS --insecure-skip-tls-verify=true
oc project myskills

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  oc rollout latest api-ci
fi

if [[ ! -z "$TRAVIS_TAG" ]]; then
  oc rollout latest api-test
fi

oc logout

exit $err
