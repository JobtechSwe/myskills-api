#!/bin/bash
err=0
trap 'err=1' ERR
token=`cat ./infrastructure/travis/openshift-token`

oc login $OPENSHIFT_URL --token=$token --insecure-skip-tls-verify=true

oc rollout latest api-ci -n myskills

oc logout

exit $err
