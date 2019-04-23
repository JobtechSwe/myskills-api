type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  /** The UUID scalar type represents a UUID. */
  UUID: any
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

export type Consent = {
  id: Scalars['String']
  url: Scalars['String']
  expires: Scalars['String']
}

export type ConsentResponse = {
  accessToken: Scalars['String']
}

export type Education = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
}

export type EducationInput = {
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
}

export type Experience = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
  years: Scalars['String']
}

export type ExperienceInput = {
  taxonomyId: Scalars['String']
  term?: Maybe<Scalars['String']>
  years: Scalars['String']
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
  removeSkill: Scalars['Boolean']
  /** Remove education from user */
  removeEducation: Scalars['Boolean']
  /** Remove experience from user */
  removeExperience: Scalars['Boolean']
  /** Remove language from user */
  removeLanguage: Scalars['Boolean']
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

export type Profile = {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type ProfileInput = {
  firstName: Scalars['String']
  lastName: Scalars['String']
}

export type Query = {
  /** Get user languages */
  languages: Array<Language>
  /** Get user educations */
  educations: Array<Maybe<Education>>
  /** Get user experiences */
  experiences: Array<Maybe<Experience>>
  /** Get user profile */
  profile: Profile
  /** Get user skills */
  skills: Array<Maybe<Skill>>
  /** Get from taxonomy */
  taxonomy: TaxonomyResponse
}

export type QueryTaxonomyArgs = {
  params?: Maybe<TaxonomyQueryInput>
}

export type Skill = {
  id: Scalars['String']
  taxonomyId: Scalars['String']
  term: Scalars['String']
  type: Scalars['String']
}

export type SkillInput = {
  taxonomyId: Scalars['String']
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
  Language: Language
  Education: Education
  String: Scalars['String']
  Experience: Experience
  Profile: Profile
  Skill: Skill
  TaxonomyQueryInput: TaxonomyQueryInput
  Int: Scalars['Int']
  TaxonomyType: TaxonomyType
  TaxonomyResponse: TaxonomyResponse
  TaxonomySearch: TaxonomySearch
  TaxonomyResult: TaxonomyResult
  Mutation: Mutation
  Consent: Consent
  Login: Login
  ExperienceInput: ExperienceInput
  EducationInput: EducationInput
  ProfileInput: ProfileInput
  SkillInput: SkillInput
  Boolean: Scalars['Boolean']
  Subscription: Subscription
  ConsentResponse: ConsentResponse
  CacheControlScope: CacheControlScope
  Date: Scalars['Date']
  Email: Scalars['Email']
  JSON: Scalars['JSON']
  Password: Scalars['Password']
  TaxonomyDefaultResult: TaxonomyDefaultResult
  TaxonomySkillResult: TaxonomySkillResult
  Upload: Scalars['Upload']
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

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type EducationResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Education']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
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
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  years?: Resolver<ResolversTypes['String'], ParentType, Context>
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
  consent?: Resolver<ResolversTypes['Consent'], ParentType, Context>
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
}

export interface PasswordScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password'
}

export type ProfileResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Profile']
> = {
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>
}

export type QueryResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Query']
> = {
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
  profile?: Resolver<ResolversTypes['Profile'], ParentType, Context>
  skills?: Resolver<Array<Maybe<ResolversTypes['Skill']>>, ParentType, Context>
  taxonomy?: Resolver<
    ResolversTypes['TaxonomyResponse'],
    ParentType,
    Context,
    QueryTaxonomyArgs
  >
}

export type SkillResolvers<
  Context = ApolloServerContext,
  ParentType = ResolversTypes['Skill']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, Context>
  taxonomyId?: Resolver<ResolversTypes['String'], ParentType, Context>
  term?: Resolver<ResolversTypes['String'], ParentType, Context>
  type?: Resolver<ResolversTypes['String'], ParentType, Context>
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
  Date?: GraphQLScalarType
  Education?: EducationResolvers<Context>
  Email?: GraphQLScalarType
  Experience?: ExperienceResolvers<Context>
  JSON?: GraphQLScalarType
  Login?: LoginResolvers<Context>
  Mutation?: MutationResolvers<Context>
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
