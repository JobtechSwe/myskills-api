type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A password string. Has to be at least 8 characters long. */
  Password: any
  /** The UUID scalar type represents a UUID. */
  UUID: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Consent = {
  id: Scalars['String']
  url: Scalars['String']
  expires: Scalars['String']
}

export type ConsentResponse = {
  accessToken: Scalars['String']
}

export type Cv = {
  skills?: Maybe<Array<Maybe<Skill>>>
  educations?: Maybe<Array<Maybe<Education>>>
  experiences?: Maybe<Array<Maybe<Experience>>>
  occupation?: Maybe<Occupation>
}

export type CvInput = {
  skills?: Maybe<Array<SkillInput>>
  educations?: Maybe<Array<EducationInput>>
  experiences?: Maybe<Array<ExperienceInput>>
  occupation?: Maybe<OccupationInput>
}

export type Education = {
  programme: Scalars['String']
  school: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
  id: Scalars['String']
}

export type EducationInput = {
  programme: Scalars['String']
  school: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type Experience = {
  id: Scalars['String']
  employer: Scalars['String']
  sourceId?: Maybe<Scalars['String']>
  term: Scalars['String']
  start: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type ExperienceInput = {
  sourceId?: Maybe<Scalars['String']>
  term: Scalars['String']
  start: Scalars['String']
  employer: Scalars['String']
  end?: Maybe<Scalars['String']>
}

export type ImgFile = {
  imageString: Scalars['String']
}

export enum Language {
  Spanish = 'spanish',
  Swedish = 'swedish',
}

export type Login = {
  url: Scalars['String']
  sessionId: Scalars['String']
}

export type Mutation = {
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
  /** Add user occupation */
  createOccupation: Occupation
  /** Add user trait */
  addTrait: Scalars['String']
  /** Add user description */
  addPersonalDescription: Scalars['String']
  /** Remove skill from user */
  removeSkill: Scalars['Boolean']
  /** Remove education from user */
  removeEducation: Scalars['Boolean']
  /** Remove experience from user */
  removeExperience: Scalars['Boolean']
  /** Remove language from user */
  removeLanguage: Scalars['Boolean']
  /** Save the complete cv to user */
  saveCV: Cv
  /** Save Image as base64 string */
  uploadImage: ImgFile
}

export type MutationAddLanguageArgs = {
  language: Language
}

export type MutationAddExperienceArgs = {
  experience: ExperienceInput
}

export type MutationAddEducationArgs = {
  education: EducationInput
}

export type MutationCreateProfileArgs = {
  profile: ProfileInput
}

export type MutationAddSkillArgs = {
  skill: SkillInput
}

export type MutationCreateOccupationArgs = {
  occupation: OccupationInput
}

export type MutationAddTraitArgs = {
  trait: Scalars['String']
}

export type MutationAddPersonalDescriptionArgs = {
  body: Scalars['String']
}

export type MutationRemoveSkillArgs = {
  id: Scalars['String']
}

export type MutationRemoveEducationArgs = {
  id: Scalars['String']
}

export type MutationRemoveExperienceArgs = {
  id: Scalars['String']
}

export type MutationRemoveLanguageArgs = {
  language: Language
}

export type MutationSaveCvArgs = {
  cv: CvInput
}

export type MutationUploadImageArgs = {
  file: Scalars['Upload']
}

export type Occupation = {
  term: Scalars['String']
  experience?: Maybe<OccupationExperience>
}

export type OccupationExperience = {
  years: Scalars['Int']
}

export type OccupationExperienceInput = {
  years: Scalars['Int']
}

export type OccupationInput = {
  term: Scalars['String']
  experience?: Maybe<OccupationExperienceInput>
}

export type OntologyConceptInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OntologyConceptResponse = {
  id: Scalars['String']
  term: Scalars['String']
  type: OntologyType
}

export type OntologyConceptsInput = {
  type?: Maybe<OntologyType>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
}

export type OntologyConceptTermInput = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type OntologyConceptTermResponse = {
  id: Scalars['String']
  term: Scalars['String']
  type: OntologyType
  terms?: Maybe<Array<Maybe<OntologyTerm>>>
}

export type OntologyRelatedInput = {
  concepts?: Maybe<Array<Scalars['String']>>
  id?: Maybe<Array<Scalars['String']>>
  limit?: Maybe<Scalars['Int']>
  type: OntologyType
}

export type OntologyRelatedResponse = {
  count: Scalars['Int']
  concepts: Array<Maybe<OntologyConceptResponse>>
  relations: Array<Maybe<OntologyRelationResponse>>
}

export type OntologyRelationDetails = {
  word2Vec?: Maybe<Scalars['Float']>
}

export type OntologyRelationResponse = {
  id: Scalars['String']
  term: Scalars['String']
  type: OntologyType
  score: Scalars['Float']
  details: OntologyRelationDetails
}

export type OntologyTerm = {
  term?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type OntologyTextParseResponse = {
  id: Scalars['String']
  term: Scalars['String']
  type: OntologyType
  terms: Array<Maybe<Scalars['String']>>
}

export enum OntologyType {
  Skill = 'SKILL',
  Occupation = 'OCCUPATION',
  Trait = 'TRAIT',
}

export type Profile = {
  name: Scalars['String']
  email: Scalars['String']
  telephone?: Maybe<Scalars['String']>
}

export type ProfileInput = {
  name: Scalars['String']
  email: Scalars['String']
  telephone?: Maybe<Scalars['String']>
}

export type Query = {
  /** Gets a consent request */
  consent: Consent
  /** Get user languages */
  languages: Array<Language>
  /** Get user educations */
  educations: Array<Maybe<Education>>
  /** Get user experiences */
  experiences: Array<Maybe<Experience>>
  /** Get occupation */
  occupation: Occupation
  /** Get user profile */
  profile: Profile
  /** Get user skills */
  skills: Array<Maybe<Skill>>
  /** Get user image */
  image: Scalars['String']
  /** Get from taxonomy */
  taxonomy: TaxonomyResponse
  /** Get from ontology */
  ontologyConcepts: Array<Maybe<OntologyConceptResponse>>
  ontologyConcept: OntologyConceptTermResponse
  ontologyRelated: OntologyRelatedResponse
  ontologyTextParse: Array<Maybe<OntologyTextParseResponse>>
}

export type QueryTaxonomyArgs = {
  params?: Maybe<TaxonomyQueryInput>
}

export type QueryOntologyConceptsArgs = {
  params?: Maybe<OntologyConceptsInput>
}

export type QueryOntologyConceptArgs = {
  id: Scalars['String']
  params?: Maybe<OntologyConceptInput>
}

export type QueryOntologyRelatedArgs = {
  params?: Maybe<OntologyRelatedInput>
}

export type QueryOntologyTextParseArgs = {
  text: Scalars['String']
}

export type Skill = {
  sourceId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
  id: Scalars['String']
}

export type SkillInput = {
  sourceId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type Subscription = {
  consentApproved: ConsentResponse
  loginApproved: ConsentResponse
}

export type SubscriptionConsentApprovedArgs = {
  consentRequestId: Scalars['String']
}

export type SubscriptionLoginApprovedArgs = {
  loginRequestId: Scalars['String']
}

export type TaxonomyDefaultResult = TaxonomyResult & {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
  parentId?: Maybe<Scalars['String']>
}

export type TaxonomyQueryInput = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  q?: Maybe<Scalars['String']>
  type?: Maybe<TaxonomyType>
  parentId?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type TaxonomyResponse = {
  search: TaxonomySearch
  total: Scalars['Int']
  result: Array<Maybe<TaxonomyResult>>
}

export type TaxonomyResult = {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type TaxonomySearch = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type TaxonomySkillResult = TaxonomyResult & {
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
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

import { ApolloServerContext } from '../typings/context'

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: Query
  Consent: Consent
  String: Scalars['String']
  Language: Language
  Education: Education
  Experience: Experience
  Occupation: Occupation
  OccupationExperience: OccupationExperience
  Int: Scalars['Int']
  Profile: Profile
  Skill: Skill
  TaxonomyQueryInput: TaxonomyQueryInput
  TaxonomyType: TaxonomyType
  TaxonomyResponse: TaxonomyResponse
  TaxonomySearch: TaxonomySearch
  TaxonomyResult: TaxonomyResult
  OntologyConceptsInput: OntologyConceptsInput
  OntologyType: OntologyType
  OntologyConceptResponse: OntologyConceptResponse
  OntologyConceptInput: OntologyConceptInput
  OntologyConceptTermResponse: OntologyConceptTermResponse
  OntologyTerm: OntologyTerm
  OntologyRelatedInput: OntologyRelatedInput
  OntologyRelatedResponse: OntologyRelatedResponse
  OntologyRelationResponse: OntologyRelationResponse
  Float: Scalars['Float']
  OntologyRelationDetails: OntologyRelationDetails
  OntologyTextParseResponse: OntologyTextParseResponse
  Mutation: Mutation
  Login: Login
  ExperienceInput: ExperienceInput
  EducationInput: EducationInput
  ProfileInput: ProfileInput
  SkillInput: SkillInput
  OccupationInput: OccupationInput
  OccupationExperienceInput: OccupationExperienceInput
  Boolean: Scalars['Boolean']
  CVInput: CvInput
  CV: Cv
  Upload: Scalars['Upload']
  ImgFile: ImgFile
  Subscription: Subscription
  ConsentResponse: ConsentResponse
  CacheControlScope: CacheControlScope
  Date: Scalars['Date']
  Email: Scalars['Email']
  JSON: Scalars['JSON']
  OntologyConceptTermInput: OntologyConceptTermInput
  Password: Scalars['Password']
  TaxonomyDefaultResult: TaxonomyDefaultResult
  TaxonomySkillResult: TaxonomySkillResult
  UUID: Scalars['UUID']
}

export type ConsentResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Consent']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  url?: Resolver<ResolversTypes['String'], ParentType, Context>
  expires?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type ConsentResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['ConsentResponse']
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type CvResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['CV']
> = {
  skills?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Skill']>>>,
    ParentType,
    Context
  >
  educations?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Education']>>>,
    ParentType,
    Context
  >
  experiences?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Experience']>>>,
    ParentType,
    Context
  >
  occupation?: Resolver<
    Maybe<ResolversTypes['Occupation']>,
    ParentType,
    Context
  >
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EducationResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Education']
> = {
  programme?: Resolver<ResolversTypes['String'], ParentType, Context>
  school?: Resolver<ResolversTypes['String'], ParentType, Context>
  start?: Resolver<ResolversTypes['String'], ParentType, Context>
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export interface EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email'
}

export type ExperienceResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Experience']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  employer?: Resolver<ResolversTypes['String'], ParentType, Context>
  sourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  start?: Resolver<ResolversTypes['String'], ParentType, Context>
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type ImgFileResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['ImgFile']
> = {
  imageString?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type LoginResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Login']
> = {
  url?: Resolver<ResolversTypes['String'], ParentType, Context>
  sessionId?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type MutationResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Mutation']
> = {
  login?: Resolver<ResolversTypes['Login'], ParentType, Context>
  addLanguage?: Resolver<
    ResolversTypes['Language'],
    ParentType,
    Context,
    MutationAddLanguageArgs
  >
  addExperience?: Resolver<
    ResolversTypes['Experience'],
    ParentType,
    Context,
    MutationAddExperienceArgs
  >
  addEducation?: Resolver<
    ResolversTypes['Education'],
    ParentType,
    Context,
    MutationAddEducationArgs
  >
  createProfile?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    Context,
    MutationCreateProfileArgs
  >
  addSkill?: Resolver<
    ResolversTypes['Skill'],
    ParentType,
    Context,
    MutationAddSkillArgs
  >
  createOccupation?: Resolver<
    ResolversTypes['Occupation'],
    ParentType,
    Context,
    MutationCreateOccupationArgs
  >
  addTrait?: Resolver<
    ResolversTypes['String'],
    ParentType,
    Context,
    MutationAddTraitArgs
  >
  addPersonalDescription?: Resolver<
    ResolversTypes['String'],
    ParentType,
    Context,
    MutationAddPersonalDescriptionArgs
  >
  removeSkill?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    Context,
    MutationRemoveSkillArgs
  >
  removeEducation?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    Context,
    MutationRemoveEducationArgs
  >
  removeExperience?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    Context,
    MutationRemoveExperienceArgs
  >
  removeLanguage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    Context,
    MutationRemoveLanguageArgs
  >
  saveCV?: Resolver<
    ResolversTypes['CV'],
    ParentType,
    Context,
    MutationSaveCvArgs
  >
  uploadImage?: Resolver<
    ResolversTypes['ImgFile'],
    ParentType,
    Context,
    MutationUploadImageArgs
  >
}

export type OccupationResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Occupation']
> = {
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  experience?: Resolver<
    Maybe<ResolversTypes['OccupationExperience']>,
    ParentType,
    Context
  >
}

export type OccupationExperienceResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OccupationExperience']
> = {
  years?: Resolver<ResolversTypes['Int'], ParentType, Context>
}

export type OntologyConceptResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyConceptResponse']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['OntologyType'], ParentType, Context>
}

export type OntologyConceptTermResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyConceptTermResponse']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['OntologyType'], ParentType, Context>
  terms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['OntologyTerm']>>>,
    ParentType,
    Context
  >
}

export type OntologyRelatedResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyRelatedResponse']
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, Context>
  concepts?: Resolver<
    Array<Maybe<ResolversTypes['OntologyConceptResponse']>>,
    ParentType,
    Context
  >
  relations?: Resolver<
    Array<Maybe<ResolversTypes['OntologyRelationResponse']>>,
    ParentType,
    Context
  >
}

export type OntologyRelationDetailsResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyRelationDetails']
> = {
  word2Vec?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, Context>
}

export type OntologyRelationResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyRelationResponse']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['OntologyType'], ParentType, Context>
  score?: Resolver<ResolversTypes['Float'], ParentType, Context>
  details?: Resolver<
    ResolversTypes['OntologyRelationDetails'],
    ParentType,
    Context
  >
}

export type OntologyTermResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyTerm']
> = {
  term?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type OntologyTextParseResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['OntologyTextParseResponse']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['OntologyType'], ParentType, Context>
  terms?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, Context>
}

export interface PasswordScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password'
}

export type ProfileResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Profile']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, Context>
  email?: Resolver<ResolversTypes['String'], ParentType, Context>
  telephone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type QueryResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Query']
> = {
  consent?: Resolver<ResolversTypes['Consent'], ParentType, Context>
  languages?: Resolver<Array<ResolversTypes['Language']>, ParentType, Context>
  educations?: Resolver<
    Array<Maybe<ResolversTypes['Education']>>,
    ParentType,
    Context
  >
  experiences?: Resolver<
    Array<Maybe<ResolversTypes['Experience']>>,
    ParentType,
    Context
  >
  occupation?: Resolver<ResolversTypes['Occupation'], ParentType, Context>
  profile?: Resolver<ResolversTypes['Profile'], ParentType, Context>
  skills?: Resolver<Array<Maybe<ResolversTypes['Skill']>>, ParentType, Context>
  image?: Resolver<ResolversTypes['String'], ParentType, Context>
  taxonomy?: Resolver<
    ResolversTypes['TaxonomyResponse'],
    ParentType,
    Context,
    QueryTaxonomyArgs
  >
  ontologyConcepts?: Resolver<
    Array<Maybe<ResolversTypes['OntologyConceptResponse']>>,
    ParentType,
    Context,
    QueryOntologyConceptsArgs
  >
  ontologyConcept?: Resolver<
    ResolversTypes['OntologyConceptTermResponse'],
    ParentType,
    Context,
    QueryOntologyConceptArgs
  >
  ontologyRelated?: Resolver<
    ResolversTypes['OntologyRelatedResponse'],
    ParentType,
    Context,
    QueryOntologyRelatedArgs
  >
  ontologyTextParse?: Resolver<
    Array<Maybe<ResolversTypes['OntologyTextParseResponse']>>,
    ParentType,
    Context,
    QueryOntologyTextParseArgs
  >
}

export type SkillResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Skill']
> = {
  sourceId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type SubscriptionResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Subscription']
> = {
  consentApproved?: SubscriptionResolver<
    ResolversTypes['ConsentResponse'],
    ParentType,
    Context,
    SubscriptionConsentApprovedArgs
  >
  loginApproved?: SubscriptionResolver<
    ResolversTypes['ConsentResponse'],
    ParentType,
    Context,
    SubscriptionLoginApprovedArgs
  >
}

export type TaxonomyDefaultResultResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['TaxonomyDefaultResult']
> = {
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type TaxonomyResponseResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['TaxonomyResponse']
> = {
  search?: Resolver<ResolversTypes['TaxonomySearch'], ParentType, Context>
  total?: Resolver<ResolversTypes['Int'], ParentType, Context>
  result?: Resolver<
    Array<Maybe<ResolversTypes['TaxonomyResult']>>,
    ParentType,
    Context
  >
}

export type TaxonomyResultResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['TaxonomyResult']
> = {
  __resolveType: TypeResolveFn<
    'TaxonomyDefaultResult' | 'TaxonomySkillResult',
    ParentType,
    Context
  >
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export type TaxonomySearchResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['TaxonomySearch']
> = {
  offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, Context>
  limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, Context>
}

export type TaxonomySkillResultResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['TaxonomySkillResult']
> = {
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID'
}

export type Resolvers<Context = ApolloServerContext> = {
  Consent?: ConsentResolvers<Context>
  ConsentResponse?: ConsentResponseResolvers<Context>
  CV?: CvResolvers<Context>
  Date?: GraphQLScalarType
  Education?: EducationResolvers<Context>
  Email?: GraphQLScalarType
  Experience?: ExperienceResolvers<Context>
  ImgFile?: ImgFileResolvers<Context>
  JSON?: GraphQLScalarType
  Login?: LoginResolvers<Context>
  Mutation?: MutationResolvers<Context>
  Occupation?: OccupationResolvers<Context>
  OccupationExperience?: OccupationExperienceResolvers<Context>
  OntologyConceptResponse?: OntologyConceptResponseResolvers<Context>
  OntologyConceptTermResponse?: OntologyConceptTermResponseResolvers<Context>
  OntologyRelatedResponse?: OntologyRelatedResponseResolvers<Context>
  OntologyRelationDetails?: OntologyRelationDetailsResolvers<Context>
  OntologyRelationResponse?: OntologyRelationResponseResolvers<Context>
  OntologyTerm?: OntologyTermResolvers<Context>
  OntologyTextParseResponse?: OntologyTextParseResponseResolvers<Context>
  Password?: GraphQLScalarType
  Profile?: ProfileResolvers<Context>
  Query?: QueryResolvers<Context>
  Skill?: SkillResolvers<Context>
  Subscription?: SubscriptionResolvers<Context>
  TaxonomyDefaultResult?: TaxonomyDefaultResultResolvers<Context>
  TaxonomyResponse?: TaxonomyResponseResolvers<Context>
  TaxonomyResult?: TaxonomyResultResolvers
  TaxonomySearch?: TaxonomySearchResolvers<Context>
  TaxonomySkillResult?: TaxonomySkillResultResolvers<Context>
  Upload?: GraphQLScalarType
  UUID?: GraphQLScalarType
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = ApolloServerContext> = Resolvers<Context>
