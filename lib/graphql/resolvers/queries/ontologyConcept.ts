import {
  QueryResolvers,
  OntologyType,
  OntologyTerm,
  OntologyConceptTermResponse,
} from '../../../__generated__/myskills'
import { renameKeys } from '../../../utils/renameKeys'

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

export const ontologyConcept: QueryResolvers['ontologyConcept'] = async (
  _,
  { id, params },
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.getData<OntologyConceptTermApiResponse>(
      `concept/${id}/terms`,
      params as object
    )

    return renameKeys(
      { uuid: 'id', name: 'term' },
      data
    ) as OntologyConceptTermResponse
  } catch (error) {
    throw new Error(error)
  }
}
