## <b>Travis Config</b>

The Travis configuration consists of 3 stages:

- test
- integration-test
- release

### Test

- It uses node as the language, will install node based on your .nvmrc file and it has cache configured for npm.
- It runs everytime unaffected by any condition

### Integration-tests

- It runs everytime unaffected by any condition
- Starts the application with the docker-compose.test.yml and runs integration tests

### Release

- It runs if the commit branch is master and not a pull request
- Creates changelog
- Creates a new github release based on semantic commit messages
- Based on the above on the master branch we push the tag `latest` and a new version tag based on semantic commits to Docker Hub
- It uses ruby as the default language, it will install the openshift client and add it to the path
- Based on the above on the master branch it deploy the ci app

## <b>How to do things</b>

#### Install the travis cli

https://github.com/travis-ci/travis.rb#installation

#### Service account and token

- create a Service Account in Openshift <br>

```bash
oc create sa myskills-deployer
```

- assign the `edit` role to the service account <br>
  this is required because the rollout command has to update deployment configs <br>
  the format of the account is `system:serviceaccount:[PROJECT NAME]:[ACCOUNT NAME]`

```bash
oc policy add-role-to-user edit system:serviceaccount:myskills:myskills-deployer
```

- show tokens for our service account <br>
  `oc describe sa myskills-deployer` <br>

- you would see 2 tokens like bellow: <br>
  according to the documentation for API calls outside of Openshift it's recommended to use the token that is not mounted for the dockercfg<br>
  also according to the documentation tokens do not expire unless you actually delete the secret, in which case a new one is generated <br>
  in this case it would be `myskills-deployer-token-d2drr`

```bash
Mountable secrets: myskills-deployer-token-r2mzx
                   myskills-deployer-dockercfg-7dz6b
Tokens:            myskills-deployer-token-d2drr
                   myskills-deployer-token-r2mzx
```

- show the token secret contents and select the `token` part of it <br>

```bash
oc describe secret myskills-deployer-token-d2drr
```

- save the token into a file that we are going to use to create an encrypted file in Travis <br>
  (the reason is that the token size is too big to store into the `.travis.yml`)<br>
  for example you can store the token into `openshift-token`<br>

```bash
travis encrypt-file openshift-token --add --com
```

- #### <b>DELETE THE UNENCRYPTED FILE!</b>

- we move the generated encrypted file to `./infrastructure/travis` folder <br>
  then we update the `.travis.yml` to use the new path to the encrypted file <br>
  and also update the path to the output file that will be generated in Travis <br>

```bash
before_install:
- openssl aes-256-cbc -K $encrypted_7512648e3e98_key -iv $encrypted_7512648e3e98_iv
  -in ./infrastructure/travis/openshift-token.enc -out ./infrastructure/travis/openshift-token -d
```
