import { gql } from 'apollo-server-express'

export const SAVE_CV = gql`
  mutation saveCV(
    $skills: [SkillInput!]
    $education: [EducationInput!]
    $experience: [ExperienceInput!]
  ) {
    saveCV(
      cv: { skills: $skills, education: $education, experience: $experience }
    ) {
      skills {
        id
        taxonomyId
        term
        type
      }
      education {
        id
        taxonomyId
        name
      }
      experience {
        id
        taxonomyId
        name
        years
      }
    }
  }
`
