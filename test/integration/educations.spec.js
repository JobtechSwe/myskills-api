const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const nock = require('nock')
const { expect } = require('chai')
const { DOMAIN } = require('../../lib/config')
const sinon = require('sinon')

const GET_EDUCATIONS = gql`
  query getEducations {
    getEducations {
      name
    }
  }
`

const ADD_EDUCATION = gql`
  query addEducation($name: String!) {
    addEducation(name: $name) {
      name
    }
  }
`

// nock.recorder.rec()
describe('#educations', () => {
  let query
  let mydata
  beforeEach(() => {
    mydata = {
      getData: sinon.stub(),
      setData: sinon.stub(),
    }
    const { server } = require(`${process.cwd()}/lib/server`)
    const context = server.context({})

    server.context = () => ({
      ...context,
      mydata,
      headers: {
        token: 'sometoken',
      },
    })

    const client = createTestClient(server)
    query = client.query
  })

  describe('getEducations', () => {
    beforeEach(() => {
      mydata.getData.resolves([
        {
          name: 'Simon',
        },
      ])
    })

    it('should get educations', async () => {
      const { data } = await query({
        query: GET_EDUCATIONS,
      })
      console.log('data: ', data)
      expect(data.getEducations[0].name).to.equal('Simon')
    })
  })

  xdescribe('addEducation', () => {
    it('should be possible to add an education')
  })
})
