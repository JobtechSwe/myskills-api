# How to do things

## Assumptions

Before you begin, this guide assumes that...

- ...you have the OpenShift CLI installed (oc) version 3.x
- ...you have a functioning OpenShift cluster
- ...you have created a project namespace (example: `myskills`)
- ...you have run `oc login` towards your OpenShift cluster
- ...you are set oc to use your project `oc project myskills`

### Secrets

#### Github hook

- Create a github hook with a secret and store it somewhere (we used Lastpass for it)
- Then use the secret and create an Openshift secret with it

```bash
# Replace create-this-in-github with your secret
oc create secret generic github-webhook-secret --from-literal=WebHookSecretKey=create-this-in-github
```

#### MyData certificates

- Request certificates from [MyData](http://TODO.link.to.real.mydata.page) and create an Openshift secret (`mydata-operator` that will be referenced in the `api.yml`)

```bash
oc create secret generic mydata-operator --from-file=/tmp/public.key --from-file=/tmp/private.key
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

##### Deploy the whole stack

```bash
oc apply -f ./ci
```

##### Delete the whole stack

```bash
oc delete -f ./ci
```
