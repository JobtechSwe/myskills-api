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

1. Run `sh integration-tests.sh`
