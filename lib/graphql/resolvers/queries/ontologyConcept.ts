import {
  QueryResolvers,
  OntologyType,
  OntologyConceptQueryArgs,
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

    return renameKeys({ uuid: 'id' })(data) as OntologyConceptTermResponse
  } catch (error) {
    throw new Error(error)
  }
}
