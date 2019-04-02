import {
  QueryResolvers,
  OntologyType,
  OntologyConceptsQueryArgs,
} from '../../../__generated__/myskills'
import { renameProp } from '../../../utils/renameProp'

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

    return data.map(x => renameProp('uuid', 'id', x))
  } catch (error) {
    throw new Error(error)
  }
}
