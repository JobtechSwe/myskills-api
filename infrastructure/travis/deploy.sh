#!/bin/bash
err=0
trap 'err=1' ERR
token=`cat ./infrastructure/travis/openshift-token`

oc login $OPENSHIFT_URL --token=$token --insecure-skip-tls-verify=true

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  oc rollout latest api-ci -n myskills
fi

if [[ ! -z "$TRAVIS_TAG" ]]; then
  oc rollout latest api-test -n myskills
fi

oc logout

exit $err
