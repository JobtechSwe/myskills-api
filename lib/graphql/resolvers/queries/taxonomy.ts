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
    console.log('args.params: ', args.params)

    const data = await taxonomyAPI.getData<AfTaxonomyResponse>(
      args.params || {}
    )
    const formatData = {
      ...data,
      result: data.result.map(x => ({
        taxonomyId: x.conceptId,
        ...x,
      })),
    }
    console.log(formatData)
    return formatData
  } catch (error) {
    throw new Error(error)
  }
}
