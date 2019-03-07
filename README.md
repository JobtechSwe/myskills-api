# myskills-api

## Start dev environment

- Clone [myskills-api](https://github.com/JobtechSwe/myskills-api/) repo
- Create local docker network: `docker network create myskills`
- Run the docker-services: `docker-compose up -d`
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

- Now you cant start using all the other querys and mutations

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
