import { gql } from 'apollo-server-express'
export const typeDefs = gql`
  input ImgInput {
    imageString: String!
  }

  type ImgFile {
    imageString: String!
  }
`
