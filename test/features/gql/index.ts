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
        taxonomyId
        term
        type
      }
      education {
        taxonomyId
        name
      }
      experience {
        taxonomyId
        name
        years
      }
    }
  }
`

export const SKILLS = gql`
  query skills {
    skills {
      taxonomyId
      term
      type
    }
  }
`
