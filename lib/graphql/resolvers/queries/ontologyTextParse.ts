import { QueryResolvers, OntologyType } from '../../../__generated__/myskills'

interface OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
}

interface OntologyTextParseApiResponse extends OntologyConceptApiResponse {
  uuid: string
  name: string
  type: OntologyType
  terms: string[]
}

export const ontologyTextParse: QueryResolvers['ontologyTextParse'] = async (
  _,
  { text },
  { dataSources: { ontologyAPI } }
) => {
  try {
    const data = await ontologyAPI.postData<OntologyTextParseApiResponse[]>(
      'text-to-structure',
      { body: text }
    )

    return data.map(ontology => ({
      id: ontology.uuid,
      term: ontology.name,
      type: ontology.type,
      terms: ontology.terms,
    }))
  } catch (error) {
    throw new Error(error)
  }
}
