import {
  QueryResolvers,
  TaxonomyQueryArgs,
} from '../../../__generated__/myskills'

interface AfTaxonomyResult {
  conceptId: string
  term: string
  type: string
  parentId: string
}

interface AfTaxonomyResponse {
  search: {
    offset: number
    limit: number
  }
  total: number
  result: [AfTaxonomyResult]
}

export const taxonomy: QueryResolvers.TaxonomyResolver = async (
  _,
  args: TaxonomyQueryArgs,
  { dataSources: { taxonomyAPI } }
) => {
  try {
    const data = await taxonomyAPI.getData<AfTaxonomyResponse>(
      args.params || {}
    )

    return {
      ...data,
      result: data.result.map(x => ({
        taxonomyId: x.conceptId,
        ...x,
      })),
    }
  } catch (error) {
    throw new Error(error)
  }
}
