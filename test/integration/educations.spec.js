const sinon = require('sinon')
const nock = require('nock')
const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server-express')
const { expect } = require('chai')

const GET_EDUCATIONS = gql`
  query getEducations {
    getEducations {
      name
    }
  }
`

const ADD_EDUCATION = gql`
  mutation addEducation($name: String!, $id: String!) {
    addEducation(education: { name: $name, id: $id }) {
      id
      name
    }
  }
`

describe('#educations', () => {
  let query
  let mutate
  let mydata

  beforeEach(() => {
    mydata = {
      getData: sinon.stub(),
      saveData: sinon.stub(),
    }

    const { server } = require(`${process.cwd()}/dist/server`)
    const context = server.context({})

    server.context = () => ({
      ...context,
      mydata,
      headers: {
        token: 'sometoken',
      },
    })

    const client = createTestClient(server)
    mutate = client.mutate
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

      expect(data.getEducations[0].name).to.equal('Simon')
    })
  })

  describe('addEducation', () => {
    beforeEach(() => {
      mydata.saveData.resolves([
        {
          id: '123',
          name: 'Simon :)',
        },
      ])
    })

    it('should be possible to add an education', async () => {
      const {
        data: { addEducation },
      } = await mutate({
        mutation: ADD_EDUCATION,
        variables: {
          id: 'id',
          name: 'simon',
        },
      })

      expect(addEducation[0].name).to.equal('Simon :)')
    })
  })
})
