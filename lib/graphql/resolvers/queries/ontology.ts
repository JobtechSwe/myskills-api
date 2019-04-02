import {
  QueryResolvers,
  OntologyType,
  OntologyConceptQueryArgs,
  OntologyConceptsQueryArgs,
  OntologyTerm,
  OntologyRelatedResponse,
  OntologyRelatedQueryArgs,
  OntologyRelationResponse,
  OntologyConceptResponse,
  OntologyTextParseQueryArgs,
} from '../../../__generated__/myskills'
import { renameProp } from '../../../../lib/utils/renameProp'

interface OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
}

interface OntologyConceptTermApiResponse extends OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
  terms: OntologyTerm[]
}

interface OntologyTextParseApiResponse extends OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
  terms: string[]
}

interface OntologyRelationApiResponse {
  uuid: string
  name: string
  type: OntologyType
  score: number
  details: {
    Word2Vec: number
  }
}

interface OntologyRelatedApiResponse {
  count: number
  concepts: OntologyConceptApiResponse[]
  relations: OntologyRelationApiResponse[]
}

export const ontologyConcepts: QueryResolvers.OntologyConceptsResolver = async (
  _,
  { params }: OntologyConceptsQueryArgs,
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.getData<OntologyConceptApiResponse[]>(
      'concept',
      params as object
    )

    return data.map(x => ({
      id: x.uuid,
      name: x.name,
      type: x.type,
    }))
  } catch (error) {
    throw new Error(error)
  }
}

export const ontologyConcept: QueryResolvers.OntologyConceptResolver = async (
  _,
  { id, params }: OntologyConceptQueryArgs,
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.getData<OntologyConceptTermApiResponse>(
      `concept/${id}/terms`,
      params as object
    )

    return {
      id: data.uuid,
      name: data.name,
      type: data.type,
      terms: data.terms,
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const ontologyTextParse: QueryResolvers.OntologyTextParseResolver = async (
  _,
  { text }: OntologyTextParseQueryArgs,
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.postData<OntologyTextParseApiResponse[]>(
      'text-to-structure',
      { body: text }
    )

    return data.map(ontology => ({
      id: ontology.uuid,
      name: ontology.name,
      type: ontology.type,
      terms: ontology.terms,
    }))
  } catch (error) {
    throw new Error(error)
  }
}

export const ontologyRelated: QueryResolvers.OntologyRelatedResolver = async (
  _,
  { params }: OntologyRelatedQueryArgs,
  { dataSources: { ontologyAPI } }
) => {
  try {
    const query = renameProp('id', 'uuid', params)

    const data = await ontologyAPI.getData<OntologyRelatedApiResponse>(
      `concept/related`,
      query
    )

    return {
      count: data.count,
      relations: data.relations.map(
        x =>
          ({
            id: x.uuid,
            name: x.name,
            type: x.type,
            details: x.details.Word2Vec
              ? {
                  word2Vec: x.details.Word2Vec,
                }
              : {},
            score: x.score,
          } as OntologyRelationResponse)
      ),
      concepts: data.concepts.map(
        x =>
          ({
            id: x.uuid,
            name: x.name,
            type: x.type,
          } as OntologyConceptResponse)
      ),
    } as OntologyRelatedResponse
  } catch (error) {
    throw new Error(error)
  }
}
