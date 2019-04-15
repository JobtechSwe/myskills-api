export type Maybe<T> = T | null

export interface TaxonomyQueryInput {
  offset?: Maybe<number>

  limit?: Maybe<number>

  q?: Maybe<string>

  type?: Maybe<TaxonomyType>

  parentId?: Maybe<(Maybe<string>)[]>
}

export interface OntologyConceptsInput {
  type?: Maybe<OntologyType>

  limit?: Maybe<number>

  offset?: Maybe<number>

  filter?: Maybe<string>
}

export interface OntologyConceptInput {
  limit?: Maybe<number>

  offset?: Maybe<number>
}

export interface OntologyRelatedInput {
  concepts?: Maybe<string[]>

  id?: Maybe<string[]>

  limit?: Maybe<number>

  type: OntologyType
}

export interface ExperienceInput {
  taxonomyId: string

  term?: Maybe<string>

  years: string
}

export interface EducationInput {
  taxonomyId: string

  term?: Maybe<string>
}

export interface ProfileInput {
  firstName: string

  lastName: string
}

export interface SkillInput {
  taxonomyId: string

  term: string

  type: string
}

export interface CvInput {
  skills?: Maybe<SkillInput[]>

  education?: Maybe<EducationInput[]>

  experience?: Maybe<ExperienceInput[]>
}

export interface OntologyConceptTermInput {
  limit?: Maybe<number>

  offset?: Maybe<number>
}

export enum Language {
  Spanish = 'spanish',
  Swedish = 'swedish',
}

export enum TaxonomyType {
  Region = 'REGION',
  EducationField_1 = 'EDUCATION_FIELD_1',
  EducationField_2 = 'EDUCATION_FIELD_2',
  EducationField_3 = 'EDUCATION_FIELD_3',
  EducationLevel_1 = 'EDUCATION_LEVEL_1',
  EducationLevel_2 = 'EDUCATION_LEVEL_2',
  EducationLevel_3 = 'EDUCATION_LEVEL_3',
  Language = 'LANGUAGE',
  Municipality = 'MUNICIPALITY',
  OccupationField = 'OCCUPATION_FIELD',
  OccupationGroup = 'OCCUPATION_GROUP',
  OccupationName = 'OCCUPATION_NAME',
  Skill = 'SKILL',
  WorktimeExtent = 'WORKTIME_EXTENT',
}

export enum OntologyType {
  Skill = 'SKILL',
  Occupation = 'OCCUPATION',
  Trait = 'TRAIT',
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Date = any

/** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
export type Email = any

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any

/** A password string. Has to be at least 8 characters long. */
export type Password = any

/** The `Upload` scalar type represents a file upload. */
export type Upload = any

/** The UUID scalar type represents a UUID. */
export type Uuid = any

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface TaxonomyResult {
  taxonomyId: string

  term: string

  type: string
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Get user languages */
  languages: Language[]
  /** Get user educations */
  educations: (Maybe<Education>)[]
  /** Get user experiences */
  experiences: (Maybe<Experience>)[]
  /** Get user profile */
  profile: Profile
  /** Get user skills */
  skills: (Maybe<Skill>)[]
  /** Get from taxonomy */
  taxonomy: TaxonomyResponse
  /** Get from ontology */
  ontologyConcepts: (Maybe<OntologyConceptResponse>)[]

  ontologyConcept: OntologyConceptTermResponse

  ontologyRelated: OntologyRelatedResponse

  ontologyTextParse: (Maybe<OntologyTextParseResponse>)[]
}

export interface Education {
  id: string

  taxonomyId: string

  term?: Maybe<string>
}

export interface Experience {
  id: string

  taxonomyId: string

  term?: Maybe<string>

  years: string
}

export interface Profile {
  firstName?: Maybe<string>

  lastName?: Maybe<string>
}

export interface Skill {
  id: string

  taxonomyId: string

  term: string

  type: string
}

export interface TaxonomyResponse {
  search: TaxonomySearch

  total: number

  result: (Maybe<TaxonomyResult>)[]
}

export interface TaxonomySearch {
  offset?: Maybe<number>

  limit?: Maybe<number>
}

export interface OntologyConceptResponse {
  id: string

  name: string

  type: OntologyType
}

export interface OntologyConceptTermResponse {
  id: string

  name: string

  type: OntologyType

  terms?: Maybe<(Maybe<OntologyTerm>)[]>
}

export interface OntologyTerm {
  name?: Maybe<string>

  type?: Maybe<string>
}

export interface OntologyRelatedResponse {
  count: number

  concepts: (Maybe<OntologyConceptResponse>)[]

  relations: (Maybe<OntologyRelationResponse>)[]
}

export interface OntologyRelationResponse {
  id: string

  name: string

  type: OntologyType

  score: number

  details: OntologyRelationDetails
}

export interface OntologyRelationDetails {
  word2Vec?: Maybe<number>
}

export interface OntologyTextParseResponse {
  id: string

  name: string

  type: OntologyType

  terms: (Maybe<string>)[]
}

export interface Mutation {
  /** Register consent for a user */
  consent: Consent
  /** Login an existing user */
  login: Login
  /** Add languages to user */
  addLanguage: Language
  /** Add experiences to user */
  addExperience: Experience
  /** Add education to user */
  addEducation: Education
  /** Add user profile */
  createProfile: Profile
  /** Add skill to user */
  addSkill: Skill
  /** Remove skill from user */
  removeSkill: boolean
  /** Remove education from user */
  removeEducation: boolean
  /** Remove experience from user */
  removeExperience: boolean
  /** Remove language from user */
  removeLanguage: boolean
  /** Save the complete cv to user */
  saveCV: Cv
}

export interface Consent {
  id: string

  url: string

  expires: string
}

export interface Login {
  url: string

  sessionId: string
}

export interface Cv {
  skills?: Maybe<(Maybe<Skill>)[]>

  education?: Maybe<(Maybe<Education>)[]>

  experience?: Maybe<(Maybe<Experience>)[]>
}

export interface Subscription {
  consentApproved: ConsentResponse

  loginApproved: ConsentResponse
}

export interface ConsentResponse {
  accessToken: string
}

export interface TaxonomyDefaultResult extends TaxonomyResult {
  taxonomyId: string

  term: string

  type: string

  parentId?: Maybe<string>
}

export interface TaxonomySkillResult extends TaxonomyResult {
  taxonomyId: string

  term: string

  type: string
}

// ====================================================
// Arguments
// ====================================================

export interface TaxonomyQueryArgs {
  params?: Maybe<TaxonomyQueryInput>
}
export interface OntologyConceptsQueryArgs {
  params?: Maybe<OntologyConceptsInput>
}
export interface OntologyConceptQueryArgs {
  id: string

  params?: Maybe<OntologyConceptInput>
}
export interface OntologyRelatedQueryArgs {
  params?: Maybe<OntologyRelatedInput>
}
export interface OntologyTextParseQueryArgs {
  text: string
}
export interface AddLanguageMutationArgs {
  language: Language
}
export interface AddExperienceMutationArgs {
  experience: ExperienceInput
}
export interface AddEducationMutationArgs {
  education: EducationInput
}
export interface CreateProfileMutationArgs {
  profile: ProfileInput
}
export interface AddSkillMutationArgs {
  skill: SkillInput
}
export interface RemoveSkillMutationArgs {
  id: string
}
export interface RemoveEducationMutationArgs {
  id: string
}
export interface RemoveExperienceMutationArgs {
  id: string
}
export interface RemoveLanguageMutationArgs {
  language: Language
}
export interface SaveCvMutationArgs {
  cv: CvInput
}
export interface ConsentApprovedSubscriptionArgs {
  consentRequestId: string
}
export interface LoginApprovedSubscriptionArgs {
  loginRequestId: string
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'

import { ApolloServerContext } from '../typings/context'

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export namespace QueryResolvers {
  export interface Resolvers<TContext = ApolloServerContext, TypeParent = {}> {
    /** Get user languages */
    languages?: LanguagesResolver<Language[], TypeParent, TContext>
    /** Get user educations */
    educations?: EducationsResolver<(Maybe<Education>)[], TypeParent, TContext>
    /** Get user experiences */
    experiences?: ExperiencesResolver<
      (Maybe<Experience>)[],
      TypeParent,
      TContext
    >
    /** Get user profile */
    profile?: ProfileResolver<Profile, TypeParent, TContext>
    /** Get user skills */
    skills?: SkillsResolver<(Maybe<Skill>)[], TypeParent, TContext>
    /** Get from taxonomy */
    taxonomy?: TaxonomyResolver<TaxonomyResponse, TypeParent, TContext>
    /** Get from ontology */
    ontologyConcepts?: OntologyConceptsResolver<
      (Maybe<OntologyConceptResponse>)[],
      TypeParent,
      TContext
    >

    ontologyConcept?: OntologyConceptResolver<
      OntologyConceptTermResponse,
      TypeParent,
      TContext
    >

    ontologyRelated?: OntologyRelatedResolver<
      OntologyRelatedResponse,
      TypeParent,
      TContext
    >

    ontologyTextParse?: OntologyTextParseResolver<
      (Maybe<OntologyTextParseResponse>)[],
      TypeParent,
      TContext
    >
  }

  export type LanguagesResolver<
    R = Language[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type EducationsResolver<
    R = (Maybe<Education>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ExperiencesResolver<
    R = (Maybe<Experience>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ProfileResolver<
    R = Profile,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type SkillsResolver<
    R = (Maybe<Skill>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TaxonomyResolver<
    R = TaxonomyResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, TaxonomyArgs>
  export interface TaxonomyArgs {
    params?: Maybe<TaxonomyQueryInput>
  }

  export type OntologyConceptsResolver<
    R = (Maybe<OntologyConceptResponse>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, OntologyConceptsArgs>
  export interface OntologyConceptsArgs {
    params?: Maybe<OntologyConceptsInput>
  }

  export type OntologyConceptResolver<
    R = OntologyConceptTermResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, OntologyConceptArgs>
  export interface OntologyConceptArgs {
    id: string

    params?: Maybe<OntologyConceptInput>
  }

  export type OntologyRelatedResolver<
    R = OntologyRelatedResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, OntologyRelatedArgs>
  export interface OntologyRelatedArgs {
    params?: Maybe<OntologyRelatedInput>
  }

  export type OntologyTextParseResolver<
    R = (Maybe<OntologyTextParseResponse>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, OntologyTextParseArgs>
  export interface OntologyTextParseArgs {
    text: string
  }
}

export namespace EducationResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Education
  > {
    id?: IdResolver<string, TypeParent, TContext>

    taxonomyId?: TaxonomyIdResolver<string, TypeParent, TContext>

    term?: TermResolver<Maybe<string>, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Education,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TaxonomyIdResolver<
    R = string,
    Parent = Education,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = Maybe<string>,
    Parent = Education,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace ExperienceResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Experience
  > {
    id?: IdResolver<string, TypeParent, TContext>

    taxonomyId?: TaxonomyIdResolver<string, TypeParent, TContext>

    term?: TermResolver<Maybe<string>, TypeParent, TContext>

    years?: YearsResolver<string, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Experience,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TaxonomyIdResolver<
    R = string,
    Parent = Experience,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = Maybe<string>,
    Parent = Experience,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type YearsResolver<
    R = string,
    Parent = Experience,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace ProfileResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Profile
  > {
    firstName?: FirstNameResolver<Maybe<string>, TypeParent, TContext>

    lastName?: LastNameResolver<Maybe<string>, TypeParent, TContext>
  }

  export type FirstNameResolver<
    R = Maybe<string>,
    Parent = Profile,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type LastNameResolver<
    R = Maybe<string>,
    Parent = Profile,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace SkillResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Skill
  > {
    id?: IdResolver<string, TypeParent, TContext>

    taxonomyId?: TaxonomyIdResolver<string, TypeParent, TContext>

    term?: TermResolver<string, TypeParent, TContext>

    type?: TypeResolver<string, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Skill,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TaxonomyIdResolver<
    R = string,
    Parent = Skill,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = string,
    Parent = Skill,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = string,
    Parent = Skill,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomyResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = TaxonomyResponse
  > {
    search?: SearchResolver<TaxonomySearch, TypeParent, TContext>

    total?: TotalResolver<number, TypeParent, TContext>

    result?: ResultResolver<(Maybe<TaxonomyResult>)[], TypeParent, TContext>
  }

  export type SearchResolver<
    R = TaxonomySearch,
    Parent = TaxonomyResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TotalResolver<
    R = number,
    Parent = TaxonomyResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ResultResolver<
    R = (Maybe<TaxonomyResult>)[],
    Parent = TaxonomyResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomySearchResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = TaxonomySearch
  > {
    offset?: OffsetResolver<Maybe<number>, TypeParent, TContext>

    limit?: LimitResolver<Maybe<number>, TypeParent, TContext>
  }

  export type OffsetResolver<
    R = Maybe<number>,
    Parent = TaxonomySearch,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type LimitResolver<
    R = Maybe<number>,
    Parent = TaxonomySearch,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyConceptResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyConceptResponse
  > {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    type?: TypeResolver<OntologyType, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = OntologyConceptResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = OntologyConceptResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = OntologyType,
    Parent = OntologyConceptResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyConceptTermResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyConceptTermResponse
  > {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    type?: TypeResolver<OntologyType, TypeParent, TContext>

    terms?: TermsResolver<Maybe<(Maybe<OntologyTerm>)[]>, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = OntologyConceptTermResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = OntologyConceptTermResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = OntologyType,
    Parent = OntologyConceptTermResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermsResolver<
    R = Maybe<(Maybe<OntologyTerm>)[]>,
    Parent = OntologyConceptTermResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyTermResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyTerm
  > {
    name?: NameResolver<Maybe<string>, TypeParent, TContext>

    type?: TypeResolver<Maybe<string>, TypeParent, TContext>
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = OntologyTerm,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = Maybe<string>,
    Parent = OntologyTerm,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyRelatedResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyRelatedResponse
  > {
    count?: CountResolver<number, TypeParent, TContext>

    concepts?: ConceptsResolver<
      (Maybe<OntologyConceptResponse>)[],
      TypeParent,
      TContext
    >

    relations?: RelationsResolver<
      (Maybe<OntologyRelationResponse>)[],
      TypeParent,
      TContext
    >
  }

  export type CountResolver<
    R = number,
    Parent = OntologyRelatedResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ConceptsResolver<
    R = (Maybe<OntologyConceptResponse>)[],
    Parent = OntologyRelatedResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type RelationsResolver<
    R = (Maybe<OntologyRelationResponse>)[],
    Parent = OntologyRelatedResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyRelationResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyRelationResponse
  > {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    type?: TypeResolver<OntologyType, TypeParent, TContext>

    score?: ScoreResolver<number, TypeParent, TContext>

    details?: DetailsResolver<OntologyRelationDetails, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = OntologyRelationResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = OntologyRelationResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = OntologyType,
    Parent = OntologyRelationResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ScoreResolver<
    R = number,
    Parent = OntologyRelationResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type DetailsResolver<
    R = OntologyRelationDetails,
    Parent = OntologyRelationResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyRelationDetailsResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyRelationDetails
  > {
    word2Vec?: Word2VecResolver<Maybe<number>, TypeParent, TContext>
  }

  export type Word2VecResolver<
    R = Maybe<number>,
    Parent = OntologyRelationDetails,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace OntologyTextParseResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = OntologyTextParseResponse
  > {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<string, TypeParent, TContext>

    type?: TypeResolver<OntologyType, TypeParent, TContext>

    terms?: TermsResolver<(Maybe<string>)[], TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = OntologyTextParseResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
    R = string,
    Parent = OntologyTextParseResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = OntologyType,
    Parent = OntologyTextParseResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermsResolver<
    R = (Maybe<string>)[],
    Parent = OntologyTextParseResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = ApolloServerContext, TypeParent = {}> {
    /** Register consent for a user */
    consent?: ConsentResolver<Consent, TypeParent, TContext>
    /** Login an existing user */
    login?: LoginResolver<Login, TypeParent, TContext>
    /** Add languages to user */
    addLanguage?: AddLanguageResolver<Language, TypeParent, TContext>
    /** Add experiences to user */
    addExperience?: AddExperienceResolver<Experience, TypeParent, TContext>
    /** Add education to user */
    addEducation?: AddEducationResolver<Education, TypeParent, TContext>
    /** Add user profile */
    createProfile?: CreateProfileResolver<Profile, TypeParent, TContext>
    /** Add skill to user */
    addSkill?: AddSkillResolver<Skill, TypeParent, TContext>
    /** Remove skill from user */
    removeSkill?: RemoveSkillResolver<boolean, TypeParent, TContext>
    /** Remove education from user */
    removeEducation?: RemoveEducationResolver<boolean, TypeParent, TContext>
    /** Remove experience from user */
    removeExperience?: RemoveExperienceResolver<boolean, TypeParent, TContext>
    /** Remove language from user */
    removeLanguage?: RemoveLanguageResolver<boolean, TypeParent, TContext>
    /** Save the complete cv to user */
    saveCV?: SaveCvResolver<Cv, TypeParent, TContext>
  }

  export type ConsentResolver<
    R = Consent,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type LoginResolver<
    R = Login,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type AddLanguageResolver<
    R = Language,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddLanguageArgs>
  export interface AddLanguageArgs {
    language: Language
  }

  export type AddExperienceResolver<
    R = Experience,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddExperienceArgs>
  export interface AddExperienceArgs {
    experience: ExperienceInput
  }

  export type AddEducationResolver<
    R = Education,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddEducationArgs>
  export interface AddEducationArgs {
    education: EducationInput
  }

  export type CreateProfileResolver<
    R = Profile,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, CreateProfileArgs>
  export interface CreateProfileArgs {
    profile: ProfileInput
  }

  export type AddSkillResolver<
    R = Skill,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddSkillArgs>
  export interface AddSkillArgs {
    skill: SkillInput
  }

  export type RemoveSkillResolver<
    R = boolean,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, RemoveSkillArgs>
  export interface RemoveSkillArgs {
    id: string
  }

  export type RemoveEducationResolver<
    R = boolean,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, RemoveEducationArgs>
  export interface RemoveEducationArgs {
    id: string
  }

  export type RemoveExperienceResolver<
    R = boolean,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, RemoveExperienceArgs>
  export interface RemoveExperienceArgs {
    id: string
  }

  export type RemoveLanguageResolver<
    R = boolean,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, RemoveLanguageArgs>
  export interface RemoveLanguageArgs {
    language: Language
  }

  export type SaveCvResolver<
    R = Cv,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, SaveCvArgs>
  export interface SaveCvArgs {
    cv: CvInput
  }
}

export namespace ConsentResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Consent
  > {
    id?: IdResolver<string, TypeParent, TContext>

    url?: UrlResolver<string, TypeParent, TContext>

    expires?: ExpiresResolver<string, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Consent,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type UrlResolver<
    R = string,
    Parent = Consent,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ExpiresResolver<
    R = string,
    Parent = Consent,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace LoginResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Login
  > {
    url?: UrlResolver<string, TypeParent, TContext>

    sessionId?: SessionIdResolver<string, TypeParent, TContext>
  }

  export type UrlResolver<
    R = string,
    Parent = Login,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type SessionIdResolver<
    R = string,
    Parent = Login,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace CvResolvers {
  export interface Resolvers<TContext = ApolloServerContext, TypeParent = Cv> {
    skills?: SkillsResolver<Maybe<(Maybe<Skill>)[]>, TypeParent, TContext>

    education?: EducationResolver<
      Maybe<(Maybe<Education>)[]>,
      TypeParent,
      TContext
    >

    experience?: ExperienceResolver<
      Maybe<(Maybe<Experience>)[]>,
      TypeParent,
      TContext
    >
  }

  export type SkillsResolver<
    R = Maybe<(Maybe<Skill>)[]>,
    Parent = Cv,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type EducationResolver<
    R = Maybe<(Maybe<Education>)[]>,
    Parent = Cv,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ExperienceResolver<
    R = Maybe<(Maybe<Experience>)[]>,
    Parent = Cv,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace SubscriptionResolvers {
  export interface Resolvers<TContext = ApolloServerContext, TypeParent = {}> {
    consentApproved?: ConsentApprovedResolver<
      ConsentResponse,
      TypeParent,
      TContext
    >

    loginApproved?: LoginApprovedResolver<ConsentResponse, TypeParent, TContext>
  }

  export type ConsentApprovedResolver<
    R = ConsentResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = SubscriptionResolver<R, Parent, TContext, ConsentApprovedArgs>
  export interface ConsentApprovedArgs {
    consentRequestId: string
  }

  export type LoginApprovedResolver<
    R = ConsentResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = SubscriptionResolver<R, Parent, TContext, LoginApprovedArgs>
  export interface LoginApprovedArgs {
    loginRequestId: string
  }
}

export namespace ConsentResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = ConsentResponse
  > {
    accessToken?: AccessTokenResolver<string, TypeParent, TContext>
  }

  export type AccessTokenResolver<
    R = string,
    Parent = ConsentResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomyDefaultResultResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = TaxonomyDefaultResult
  > {
    taxonomyId?: TaxonomyIdResolver<string, TypeParent, TContext>

    term?: TermResolver<string, TypeParent, TContext>

    type?: TypeResolver<string, TypeParent, TContext>

    parentId?: ParentIdResolver<Maybe<string>, TypeParent, TContext>
  }

  export type TaxonomyIdResolver<
    R = string,
    Parent = TaxonomyDefaultResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = string,
    Parent = TaxonomyDefaultResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = string,
    Parent = TaxonomyDefaultResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ParentIdResolver<
    R = Maybe<string>,
    Parent = TaxonomyDefaultResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomySkillResultResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = TaxonomySkillResult
  > {
    taxonomyId?: TaxonomyIdResolver<string, TypeParent, TContext>

    term?: TermResolver<string, TypeParent, TContext>

    type?: TypeResolver<string, TypeParent, TContext>
  }

  export type TaxonomyIdResolver<
    R = string,
    Parent = TaxonomySkillResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = string,
    Parent = TaxonomySkillResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = string,
    Parent = TaxonomySkillResult,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomyResultResolvers {
  export interface Resolvers {
    __resolveType: ResolveType
  }
  export type ResolveType<
    R = 'TaxonomyDefaultResult' | 'TaxonomySkillResult',
    Parent = TaxonomyDefaultResult | TaxonomySkillResult,
    TContext = ApolloServerContext
  > = TypeResolveFn<R, Parent, TContext>
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  ApolloServerContext
>
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  ApolloServerContext
>
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  ApolloServerContext
>
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: 'Date'
}
export interface EmailScalarConfig extends GraphQLScalarTypeConfig<Email, any> {
  name: 'Email'
}
export interface JSONScalarConfig extends GraphQLScalarTypeConfig<Json, any> {
  name: 'JSON'
}
export interface PasswordScalarConfig
  extends GraphQLScalarTypeConfig<Password, any> {
  name: 'Password'
}
export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<Upload, any> {
  name: 'Upload'
}
export interface UUIDScalarConfig extends GraphQLScalarTypeConfig<Uuid, any> {
  name: 'UUID'
}

export interface IResolvers<TContext = ApolloServerContext> {
  Query?: QueryResolvers.Resolvers<TContext>
  Education?: EducationResolvers.Resolvers<TContext>
  Experience?: ExperienceResolvers.Resolvers<TContext>
  Profile?: ProfileResolvers.Resolvers<TContext>
  Skill?: SkillResolvers.Resolvers<TContext>
  TaxonomyResponse?: TaxonomyResponseResolvers.Resolvers<TContext>
  TaxonomySearch?: TaxonomySearchResolvers.Resolvers<TContext>
  OntologyConceptResponse?: OntologyConceptResponseResolvers.Resolvers<TContext>
  OntologyConceptTermResponse?: OntologyConceptTermResponseResolvers.Resolvers<
    TContext
  >
  OntologyTerm?: OntologyTermResolvers.Resolvers<TContext>
  OntologyRelatedResponse?: OntologyRelatedResponseResolvers.Resolvers<TContext>
  OntologyRelationResponse?: OntologyRelationResponseResolvers.Resolvers<
    TContext
  >
  OntologyRelationDetails?: OntologyRelationDetailsResolvers.Resolvers<TContext>
  OntologyTextParseResponse?: OntologyTextParseResponseResolvers.Resolvers<
    TContext
  >
  Mutation?: MutationResolvers.Resolvers<TContext>
  Consent?: ConsentResolvers.Resolvers<TContext>
  Login?: LoginResolvers.Resolvers<TContext>
  Cv?: CvResolvers.Resolvers<TContext>
  Subscription?: SubscriptionResolvers.Resolvers<TContext>
  ConsentResponse?: ConsentResponseResolvers.Resolvers<TContext>
  TaxonomyDefaultResult?: TaxonomyDefaultResultResolvers.Resolvers<TContext>
  TaxonomySkillResult?: TaxonomySkillResultResolvers.Resolvers<TContext>
  TaxonomyResult?: TaxonomyResultResolvers.Resolvers
  Date?: GraphQLScalarType
  Email?: GraphQLScalarType
  Json?: GraphQLScalarType
  Password?: GraphQLScalarType
  Upload?: GraphQLScalarType
  Uuid?: GraphQLScalarType
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>
  include?: IncludeDirectiveResolver<Result>
  deprecated?: DeprecatedDirectiveResolver<Result>
}
