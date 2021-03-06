import { gql } from 'apollo-server-express'

export const SAVE_CV = gql`
  mutation saveCV(
    $skills: [SkillInput!]
    $educations: [EducationInput!]
    $experiences: [ExperienceInput!]
    $image: ImgInput
    $occupation: OccupationInput
    $personalDescription: String
    $traits: [String!]
  ) {
    saveCV(
      cv: {
        skills: $skills
        educations: $educations
        experiences: $experiences
        image: $image
        occupation: $occupation
        personalDescription: $personalDescription
        traits: $traits
      }
    ) {
      skills {
        sourceId
        term
        type
      }
      educations {
        id
        programme
        school
        start
        end
      }
      experiences {
        sourceId
        term
        employer
        start
        end
      }
      image
      occupation {
        term
      }
      personalDescription
      traits
    }
  }
`

export const SKILLS = gql`
  query skills {
    skills {
      sourceId
      term
      type
    }
  }
`

export const UPLOAD_IMAGE = gql`
  mutation uploadImage($image: ImgInput!) {
    uploadImage(image: $image)
  }
`

export const IMAGE = gql`
  query image {
    image
  }
`
