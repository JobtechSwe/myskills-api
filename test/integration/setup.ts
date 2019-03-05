jest.unmock('redis')
jest.unmock('ioredis')
jest.unmock('@mydata/client')
jest.setTimeout(10000)
jest.unmock('../../lib/adapters/taxonomy')

// Randomize server port in order to run integration tests concurrent
process.env.SERVER_PORT = `${Math.floor(Math.random() * 999) + 3000}`
process.env.DOMAIN = `http://localhost:${process.env.SERVER_PORT}`
