import {
  QueryResolvers,
  OntologyType,
  OntologyConceptResponse,
} from '../../../__generated__/myskills'
import { renameKeys } from '../../../utils/renameKeys'

interface OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
}

export const ontologyConcepts: QueryResolvers['ontologyConcepts'] = async (
  _,
  { params },
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.getData<OntologyConceptApiResponse[]>(
      'concept',
      params as object
    )

    return data.map(
      x =>
        renameKeys({ uuid: 'id', name: 'term' }, x) as OntologyConceptResponse
    )
  } catch (error) {
    throw new Error(error)
  }
}
