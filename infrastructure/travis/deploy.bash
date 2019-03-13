#!/bin/bash

oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS --insecure-skip-tls-verify=true
oc project myskills
oc rollout latest api-ci