declare interface Experience {
  id: string
  name?: string
  years: number
}

declare interface Education {
  id: string
  name?: string
}

declare interface Skill {
  id: string
  name?: string
}

declare enum Area {
  languages,
  educations,
  experiences,
  skills,
}
