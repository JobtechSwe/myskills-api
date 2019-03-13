#!/bin/bash

/tmp/openshift/oc login $OPENSHIFT_URL -u $OPENSHIFT_USER -p $OPENSHIFT_PASS --insecure-skip-tls-verify=true
/tmp/openshift/oc project myskills
<<<<<<< Updated upstream
/tmp/openshift/oc rollout latest api-ci
=======
/tmp/openshift/oc rollout latest api-ci
>>>>>>> Stashed changes
