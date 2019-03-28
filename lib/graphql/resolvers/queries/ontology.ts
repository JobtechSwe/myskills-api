import {
  QueryResolvers,
  OntologyType,
  OntologyConceptQueryArgs,
  OntologyConceptsQueryArgs,
  OntologyTerm,
} from '../../../__generated__/myskills'

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
