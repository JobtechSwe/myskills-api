Work in progress

#### Create Openshift secrets

```bash
travis encrypt OPENSHIFT_URL=localhost:8443 --com --add
travis encrypt OPENSHIFT_USER=user --com --add
travis encrypt OPENSHIFT_PASS=secret --com --add
```
