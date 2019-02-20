const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const nock = require('nock')
const { expect } = require('chai')

const GET_EDUCATIONS = gql`
  query getEducations {
    getEducations {
      id
    }
  }
`

describe('#educations', () => {
  let query
  before(() => {
    nock('http://localhost:4000')
      .post('/api/clients')
      .reply(200)
      .persist()

    const { server } = require(`${process.cwd()}/lib/server`)
    const context = server.context({})

    server.context = () => ({
      ...context,
      headers: {
        token: 'sometoken',
      },
    })

    const client = createTestClient(server)
    query = client.query
  })

  describe('getEducations', () => {
    it('should get educations', async () => {
      const data = await query({
        query: GET_EDUCATIONS,
        options: {
          context: {
            headers: {
              token: 'pancakes',
            },
          },
        },
      })

      console.log('data', data)
      expect(data).not.to.be.null
    })
  })

  // const someQuery = graphql(GET_EDUCATIONS, {
  //   options: {
  //     context: {
  //       headers: {
  //         'x-custom-header': 'pancakes',
  //       },
  //     },
  //   },
  // })

  xdescribe('addEducation', () => {
    it('should be possible to add an education')
  })
})
