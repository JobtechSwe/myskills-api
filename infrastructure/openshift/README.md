#### Github hook

- Create a github hook with a secret and store it somewhere (we used Lastpass for it)
- Then use the secret and create an Openshift secret with it

```bash
# Replace create-this-in-github with your secret
oc create secret generic github-webhook-secret --from-literal=WebHookSecretKey=create-this-in-github
```

## CI

#### Prepare dependencies

- Create PVC for Redis (this is done separately so that you can teardown your environment and keep the data)

```bash
oc apply -f ./setup/redis-ci-pvc.yml
```

- Create an Openshift secret for Redis (`redis-ci-password` secret is referenced in the redis.yml file)

```bash
# Replace create-a-secret-Secret with your secret
oc create secret generic redis-ci-password --from-literal=database-password=create-a-secret-Secret
```

#### Deploy CI

```bash
oc apply -f ./ci
```
