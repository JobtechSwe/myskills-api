jest.unmock('redis')
jest.unmock('ioredis')
jest.unmock('../../lib/adapters/taxonomy')

// Randomize server port in order to run integration tests concurrent
process.env.SERVER_PORT = `${Math.floor(Math.random() * 999) + 3000}`
