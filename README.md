# myskills-api

[![Build Status](https://travis-ci.com/JobtechSwe/myskills-api.svg?branch=master)](https://travis-ci.com/JobtechSwe/myskills-api)
[![Test Coverage](https://codeclimate.com/github/JobtechSwe/myskills-api/badges/coverage.svg)](https://codeclimate.com/github/JobtechSwe/myskills-api/coverage)

## Start dev environment

The easiest way to develop is by running everything using the dev docker-compose:

- Clone [myskills-api](https://github.com/JobtechSwe/myskills-api/) repo
- Create local docker network: `docker network create myskills`
- Run the docker-services: `docker-compose up -d`
- Go to `localhost:3000/graphql`

Note that only changes in lib and test folders will force a rebuild in the container. I.e. changes in package.json or other config files would need a rebuild: `docker-compose up -d --build`

## Get started with Egendata App

- Start the GraphQl API (see above).
- Clone [mydata](https://github.com/JobtechSwe/mydata) repo
- Navigate to app directory and follow [README](https://github.com/JobtechSwe/mydata/blob/master/app/README.md) for setup
- Create an account in the Egendata app
- The easiest way to go forward after that is by creating an account via the `myskills-web`-client
  you can then grab the authorization-token and use that for querying the GraphQL API by setting
  the adding the token to `HTTP Headers` in the GraphQL-endpoint.

  ```
  {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  }
  ```

## Environment variables

To overide default environment variables add an `.env` file in root or edit docker-compose file.

| Env variables               | Description            |
| --------------------------- | ---------------------- |
| DOMAIN                      | Application domain     |
| SERVER_PORT                 | Application port       |
| MYDATA_OPERATOR             | Egendata operator host |
| MYDATA_OPERATOR_PRIVATE_KEY | Egendata private key   |
| MYDATA_OPERATOR_PUBLIC_KEY  | Egendata public key    |
| REDIS_API_HOST              | Redis host             |
| REDIS_API_PORT              | Redis port             |
| REDIS_API_PASSWORD          | Redis password         |
| TAXONOMY_URL_BASE           | Jobtech ads API URL    |
| TAXONOMY_API_KEY            | Jobtech ads API key    |
| TAXONOMY_URL_PATH           | Jobtech taxonomy path  |

## Services

**API dependencies**

- Redis - For caching taxonomy responses from Jobtech API and user consents

## Integration tests

**To run the integration-tests once**

1. Run `sh integration-tests.sh`

**To develop with integration tests**

1. Run dev docker-compose: `docker-compose up -d`
2. Run integration tests, e.g.: `docker-compose exec -T myskills-api npm run integration -- --watchAll`

# Schema

All schema-types are available in the graphql endpoint.
