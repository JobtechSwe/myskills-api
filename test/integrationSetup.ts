import nock from 'nock'

// Mock client connect request away,
// that is started when initiating server.js

module.exports = () => {
  nock('http://localhost:4000')
    .post('/api/clients')
    .reply(200)
    .persist()
}
