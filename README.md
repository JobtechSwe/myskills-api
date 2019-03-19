# myskills-api [![Build Status](https://travis-ci.com/JobtechSwe/myskills-api.svg?branch=master)](https://travis-ci.com/JobtechSwe/myskills-api)

## Start dev environment

### Running in container

The easiest way to develop is by running everything using the dev docker-compose:

- Clone [myskills-api](https://github.com/JobtechSwe/myskills-api/) repo
- Create local docker network: `docker network create myskills`
- Run the docker-services: `docker-compose -f docker-compose.dev.yml up -d`
- Go to `localhost:3000/graphql`

Alternative, run node on local:

- Clone [myskills-api](https://github.com/JobtechSwe/myskills-api/) repo
- Map host.docker.internal to localhost. Add `127.0.0.1 host.docker.internal` to your host file
- Create local docker network: `docker network create myskills`
- Run the docker-services: `docker-compose up -d`
- Ensure you are running correct node version. If running nvm, you can ensure this by `nvm use`
- Install dependencies: `npm i`
- Run `npm run dev`
- Go to `localhost:3000/graphql`

## Get started with MyData App

- Start the GraphQl API (see above).
- Clone [mydata](https://github.com/JobtechSwe/mydata) repo
- Navigate to app directory and follow [README](https://github.com/JobtechSwe/mydata/blob/master/app/README.md) for setup
- Create an account in the MyData app
- Then you run the login mutation:

```
mutation login {
  login {
    id
  }
}
```

- Open the MyData app again and navigate to Manage Consent requests and enter the id you got from login mutation.
- In the MySkills API you should now get an consentRequestId.
- Add consentRequestId to the header `token`
- Start by adding an new account:

```
mutation createProfile {
  createProfile(profile: {
    firstName: "Bruce",
    lastName: "Wayne"
  }) {
    firstName
    lastName
  }
}
```

- Now you can start using all the other querys and mutations

## Environment variables

To overide default environment variables add an `.env` file in root or edit docker-compose file.

| Env variables               | Description           |
| --------------------------- | --------------------- |
| DOMAIN                      | Application domain    |
| SERVER_PORT                 | Application port      |
| MYDATA_OPERATOR             | MyData operator host  |
| MYDATA_OPERATOR_PRIVATE_KEY | MyData private key    |
| MYDATA_OPERATOR_PUBLIC_KEY  | MyData public key     |
| REDIS_API_HOST              | Redis host            |
| REDIS_API_PORT              | Redis port            |
| REDIS_API_PASSWORD          | Redis password        |
| TAXONOMY_URL_BASE           | Jobtech ads API URL   |
| TAXONOMY_API_KEY            | Jobtech ads API key   |
| TAXONOMY_URL_PATH           | Jobtech taxonomy path |

## Services

**API dependencies**

- Redis - For caching taxonomy responses from Jobtech API and user consents

## Integration tests

**To run the integration-tests once**

1. Run `sh integration-tests.sh`

**To develop with integration tests**

1. Run dev docker-compose: `docker-compose -f docker-compose.dev.yml up -d`
2. Run integration tests, i.g.: `docker-compose -f docker-compose.dev.yml exec -T myskills-api npm run integration -- --watchAll`
