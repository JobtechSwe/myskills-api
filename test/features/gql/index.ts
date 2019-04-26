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
        sourceId
        term
        type
      }
      education {
        id
        programme
        school
        start
        end
      }
      experience {
        sourceId
        term
        years
      }
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
