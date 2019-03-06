# myskills-api

## Start dev environment

- Clone [myskills](https://github.com/JobtechSwe/myskills-api/) repo
- Create local docker network: `docker network create myskills`
- Run the docker-services: `docker-compose up -d`
- Run `npm run dev`
- Go to `localhost:3000`

## Environment variables

To overide default environment variables add an `.env` file in root.

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

API dependencies

- Redis - For caching taxonomy responses from Jobtech API and user consents
