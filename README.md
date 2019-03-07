# Test locally

## Mydata

- Clone mydata repo

## Start operator

- In mydata repo, navigate to /operator
- Create a .env file with
  ```
  PORT=4000
  ```
- Run the docker-services: `docker-compose up -d`
- Run `npm run dev`.

### Start mydata app

- In mydata repo, navigate to /app
- Create an .env file with dropbox key and correct operator url (using local IP or ngrok etc.). I.e.
  ```
  DROPBOX_KEY=somedropboxkey
  OPERATOR_URL=http://192.168.1.68:4000/api
  ```
- Run app in mydata repo with `react-native run-ios`


### Integration tests
To run the integration-tests
1. Create the network: `docker network create myskills`
2. (for now) you need to build the docker images for the operator and e2e-simulator.
    - [e2e-simulator](https://github.com/JobtechSwe/mydata/blob/master/app/Dockerfile) tagged as `e2e-simulator`
    - [operator](https://github.com/JobtechSwe/mydata/blob/master/operator/Dockerfile) tagged as `operator`
3. Run `sh integration-tests.sh`