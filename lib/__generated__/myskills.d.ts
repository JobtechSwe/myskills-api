export type Maybe<T> = T | null

export interface TaxonomyQueryInput {
  offset?: Maybe<number>

  limit?: Maybe<number>

  q?: Maybe<string>

  type?: Maybe<Type>
}

export interface ExperienceInput {
  id: string

  name?: Maybe<string>

  years: string
}

export interface EducationInput {
  id: string

  name?: Maybe<string>
}

export interface SkillInput {
  conceptId: string

  term: string

  type: string
}

export enum Language {
  Spanish = 'spanish',
  Swedish = 'swedish',
}

export enum Type {
  Skill = 'skill',
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

export interface TaxonomyResponse {
  search: Search

  total?: Maybe<number>
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Get languages */
  getLanguages: Language[]
  /** Get educations */
  getEducations: (Maybe<Education>)[]
  /** Get experiences */
  getExperiences: (Maybe<Experience>)[]
  /** Get skills */
  getSkills: (Maybe<Skill>)[]
  /** Get skills from taxonomy */
  getSkillsFromTaxonomy: TaxonomySkillsResponse
}

export interface Education {
  id: string

  name?: Maybe<string>
}

export interface Experience {
  id: string

  name?: Maybe<string>

  years: string
}

export interface Skill {
  conceptId: string

  term: string

  type: string
}

export interface TaxonomySkillsResponse extends TaxonomyResponse {
  search: Search

  total?: Maybe<number>

  result: (Maybe<SkillsFromTaxonomy>)[]
}

export interface Search {
  offset?: Maybe<number>

  limit?: Maybe<number>
}

export interface SkillsFromTaxonomy {
  conceptId?: Maybe<string>

  term?: Maybe<string>

  type?: Maybe<string>
}

export interface Mutation {
  /** Login an existing user */
  login: Login
  /** Add languages */
  addLanguage: (Maybe<Language>)[]
  /** Add experiences */
  addExperience: (Maybe<Experience>)[]
  /** Add education */
  addEducation: (Maybe<Education>)[]
  /** Add skill */
  addSkill: (Maybe<Skill>)[]
}

export interface Login {
  id: string

  expires: string
}

// ====================================================
// Arguments
// ====================================================

export interface GetSkillsFromTaxonomyQueryArgs {
  params?: Maybe<TaxonomyQueryInput>
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
export interface AddSkillMutationArgs {
  skill: SkillInput
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
    /** Get languages */
    getLanguages?: GetLanguagesResolver<Language[], TypeParent, TContext>
    /** Get educations */
    getEducations?: GetEducationsResolver<
      (Maybe<Education>)[],
      TypeParent,
      TContext
    >
    /** Get experiences */
    getExperiences?: GetExperiencesResolver<
      (Maybe<Experience>)[],
      TypeParent,
      TContext
    >
    /** Get skills */
    getSkills?: GetSkillsResolver<(Maybe<Skill>)[], TypeParent, TContext>
    /** Get skills from taxonomy */
    getSkillsFromTaxonomy?: GetSkillsFromTaxonomyResolver<
      TaxonomySkillsResponse,
      TypeParent,
      TContext
    >
  }

  export type GetLanguagesResolver<
    R = Language[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type GetEducationsResolver<
    R = (Maybe<Education>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type GetExperiencesResolver<
    R = (Maybe<Experience>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type GetSkillsResolver<
    R = (Maybe<Skill>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type GetSkillsFromTaxonomyResolver<
    R = TaxonomySkillsResponse,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, GetSkillsFromTaxonomyArgs>
  export interface GetSkillsFromTaxonomyArgs {
    params?: Maybe<TaxonomyQueryInput>
  }
}

export namespace EducationResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Education
  > {
    id?: IdResolver<string, TypeParent, TContext>

    name?: NameResolver<Maybe<string>, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Education,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
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

    name?: NameResolver<Maybe<string>, TypeParent, TContext>

    years?: YearsResolver<string, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Experience,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type NameResolver<
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

export namespace SkillResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Skill
  > {
    conceptId?: ConceptIdResolver<string, TypeParent, TContext>

    term?: TermResolver<string, TypeParent, TContext>

    type?: TypeResolver<string, TypeParent, TContext>
  }

  export type ConceptIdResolver<
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

export namespace TaxonomySkillsResponseResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = TaxonomySkillsResponse
  > {
    search?: SearchResolver<Search, TypeParent, TContext>

    total?: TotalResolver<Maybe<number>, TypeParent, TContext>

    result?: ResultResolver<(Maybe<SkillsFromTaxonomy>)[], TypeParent, TContext>
  }

  export type SearchResolver<
    R = Search,
    Parent = TaxonomySkillsResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TotalResolver<
    R = Maybe<number>,
    Parent = TaxonomySkillsResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ResultResolver<
    R = (Maybe<SkillsFromTaxonomy>)[],
    Parent = TaxonomySkillsResponse,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace SearchResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Search
  > {
    offset?: OffsetResolver<Maybe<number>, TypeParent, TContext>

    limit?: LimitResolver<Maybe<number>, TypeParent, TContext>
  }

  export type OffsetResolver<
    R = Maybe<number>,
    Parent = Search,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type LimitResolver<
    R = Maybe<number>,
    Parent = Search,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace SkillsFromTaxonomyResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = SkillsFromTaxonomy
  > {
    conceptId?: ConceptIdResolver<Maybe<string>, TypeParent, TContext>

    term?: TermResolver<Maybe<string>, TypeParent, TContext>

    type?: TypeResolver<Maybe<string>, TypeParent, TContext>
  }

  export type ConceptIdResolver<
    R = Maybe<string>,
    Parent = SkillsFromTaxonomy,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TermResolver<
    R = Maybe<string>,
    Parent = SkillsFromTaxonomy,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type TypeResolver<
    R = Maybe<string>,
    Parent = SkillsFromTaxonomy,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = ApolloServerContext, TypeParent = {}> {
    /** Login an existing user */
    login?: LoginResolver<Login, TypeParent, TContext>
    /** Add languages */
    addLanguage?: AddLanguageResolver<(Maybe<Language>)[], TypeParent, TContext>
    /** Add experiences */
    addExperience?: AddExperienceResolver<
      (Maybe<Experience>)[],
      TypeParent,
      TContext
    >
    /** Add education */
    addEducation?: AddEducationResolver<
      (Maybe<Education>)[],
      TypeParent,
      TContext
    >
    /** Add skill */
    addSkill?: AddSkillResolver<(Maybe<Skill>)[], TypeParent, TContext>
  }

  export type LoginResolver<
    R = Login,
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type AddLanguageResolver<
    R = (Maybe<Language>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddLanguageArgs>
  export interface AddLanguageArgs {
    language: Language
  }

  export type AddExperienceResolver<
    R = (Maybe<Experience>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddExperienceArgs>
  export interface AddExperienceArgs {
    experience: ExperienceInput
  }

  export type AddEducationResolver<
    R = (Maybe<Education>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddEducationArgs>
  export interface AddEducationArgs {
    education: EducationInput
  }

  export type AddSkillResolver<
    R = (Maybe<Skill>)[],
    Parent = {},
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext, AddSkillArgs>
  export interface AddSkillArgs {
    skill: SkillInput
  }
}

export namespace LoginResolvers {
  export interface Resolvers<
    TContext = ApolloServerContext,
    TypeParent = Login
  > {
    id?: IdResolver<string, TypeParent, TContext>

    expires?: ExpiresResolver<string, TypeParent, TContext>
  }

  export type IdResolver<
    R = string,
    Parent = Login,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
  export type ExpiresResolver<
    R = string,
    Parent = Login,
    TContext = ApolloServerContext
  > = Resolver<R, Parent, TContext>
}

export namespace TaxonomyResponseResolvers {
  export interface Resolvers {
    __resolveType: ResolveType
  }
  export type ResolveType<
    R = 'TaxonomySkillsResponse',
    Parent = TaxonomySkillsResponse,
    TContext = ApolloServerContext
  > = TypeResolveFn<R, Parent, TContext>
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  CacheControlDirectiveArgs,
  ApolloServerContext
>
export interface CacheControlDirectiveArgs {
  maxAge?: Maybe<number>

  scope?: Maybe<CacheControlScope>
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
  Skill?: SkillResolvers.Resolvers<TContext>
  TaxonomySkillsResponse?: TaxonomySkillsResponseResolvers.Resolvers<TContext>
  Search?: SearchResolvers.Resolvers<TContext>
  SkillsFromTaxonomy?: SkillsFromTaxonomyResolvers.Resolvers<TContext>
  Mutation?: MutationResolvers.Resolvers<TContext>
  Login?: LoginResolvers.Resolvers<TContext>
  TaxonomyResponse?: TaxonomyResponseResolvers.Resolvers
  Date?: GraphQLScalarType
  Email?: GraphQLScalarType
  Json?: GraphQLScalarType
  Password?: GraphQLScalarType
  Upload?: GraphQLScalarType
  Uuid?: GraphQLScalarType
}

export interface IDirectiveResolvers<Result> {
  cacheControl?: CacheControlDirectiveResolver<Result>
  skip?: SkipDirectiveResolver<Result>
  include?: IncludeDirectiveResolver<Result>
  deprecated?: DeprecatedDirectiveResolver<Result>
}
