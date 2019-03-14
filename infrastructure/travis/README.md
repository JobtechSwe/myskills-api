#### Install the travis cli

https://github.com/travis-ci/travis.rb#installation

#### Create Docker secrets

```bash
travis encrypt DOCKER_EMAIL=email --com --add
travis encrypt DOCKER_USER=user --com --add
travis encrypt DOCKER_PASS=secret --com --add
```

#### Create Openshift secrets

```bash
travis encrypt OPENSHIFT_URL=localhost:8443 --com --add
travis encrypt OPENSHIFT_USER=user --com --add
travis encrypt OPENSHIFT_PASS=secret --com --add
```

The Travis configuration consists of 3 stages:

- test
- build
- deploy

### Test

- It uses node as the language, will install node based on your .nvmrc file and it has cache configured for npm.
- It runs everytime unaffected by any condition

### Build

- It uses ruby as the default language, it will skip installing any dependencies, activates Docker and with run the docker build + push commands based on the branch
- It runs if the commit branch is master and not a pull request or if the commit is a tag
- Based on the above on the master branch we push the tag `latest` to Dockerhub and for a tag we push both the tag (for example `v1.1.0`) and another tag (`latest-tag-release`)

### Deploy

- It uses ruby as the default language, it will install the openshift client and add it to the path
- It runs if the commit branch is master and not a pull request or if the commit is a tag
- Based on the above on the master branch it deploy the ci app and on for tags it deploys the test app
