import {
  QueryResolvers,
  OntologyType,
  OntologyRelatedResponse,
  OntologyRelationResponse,
  OntologyConceptResponse,
} from '../../../__generated__/myskills'
import { renameKeys } from '../../../utils/renameKeys'

interface OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
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

export const ontologyRelated: QueryResolvers['ontologyRelated'] = async (
  _,
  { params },
  { dataSources: { ontologyAPI } }
) => {
  try {
    const query = params
      ? renameKeys({ id: 'uuid', concepts: 'concept' }, params)
      : params

    const data = await ontologyAPI.getData<OntologyRelatedApiResponse>(
      `concept/related`,
      query as any
    )

    return {
      count: data.count,
      relations: data.relations.map(
        x =>
          ({
            id: x.uuid,
            term: x.name,
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
            term: x.name,
            type: x.type,
          } as OntologyConceptResponse)
      ),
    } as OntologyRelatedResponse
  } catch (error) {
    throw new Error(error)
  }
}
