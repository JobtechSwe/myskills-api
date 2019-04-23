import {
  QueryResolvers,
  OntologyType,
  OntologyConceptsQueryArgs,
  OntologyConceptResponse,
} from '../../../__generated__/myskills'
import { renameKeys } from '../../../utils/renameKeys'

interface OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
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

    return data.map(
      x => renameKeys({ uuid: 'id' })(x) as OntologyConceptResponse
    )
  } catch (error) {
    throw new Error(error)
  }
}
