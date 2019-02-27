# How to do things

## Assumptions

Before you begin, this guide assumes that...

- ...you have the OpenShift CLI installed (oc) version 3.x
- ...you have a functioning OpenShift cluster
- ...you have created a project namespace (example: `myskills`)
- ...you have run `oc login` towards your OpenShift cluster
- ...you are set oc to use your project `oc project myskills`

## Structure

- `shared` (shared resources between environments, BuildConfigs and ImageStreams)
- `setup` (resources that you should only create once and not care about it after like PVCs for example)
- `[ci, test, prod]` (environment specific resources; should be as easy as possible to deploy and teardown whenever)

## Steps

#### Secrets

1. Create a github hook with a secret and store it somewhere (we used Lastpass for it). <br>
   Then use the secret and create an Openshift secret with it

```bash
# Replace create-this-in-github with your secret
oc create secret generic github-webhook-secret --from-literal=WebHookSecretKey=create-this-in-github
```

2. Request certificates from [MyData](http://TODO.link.to.real.mydata.page) and create a secret (`mydata-operator` that will be referenced in the api deployment config)

```bash
oc create secret generic mydata-operator --from-file=/tmp/public.key --from-file=/tmp/private.key
```

3. Create an Openshift secret for Redis (`redis-ci-password` for example is referenced in the CI redis deployment config)

```bash
# Replace create-a-secret-Secret with your secret
oc create secret generic redis-ci-password --from-literal=database-password=create-a-secret-Secret
```

#### Shared resources

```bash
# Deploy shared things (BuildConfigs + ImageStreams)
oc apply -f ./shared
```

#### Prepare dependencies

- Create PVC for Redis (this is done separately so that you can teardown your environment and keep the data)

```bash
oc apply -f ./setup/redis-ci-pvc.yml
```

#### Deploy the whole stack

```bash
oc apply -f ./ci
```

#### Delete the whole stack

```bash
oc delete -f ./ci
```
