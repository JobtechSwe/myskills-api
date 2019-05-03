import { QueryResolvers, TaxonomyType } from '../../../__generated__/myskills'
import { renameKeys } from '../../../utils/renameKeys'

interface AfTaxonomyResult {
  conceptId: string
  term: string
  type: string
  parentId: string
}

export interface TaxonomyInputParams {
  offset?: number
  limit?: number
  q?: string
  type?: TaxonomyType
  'parent-id'?: [string]
}

interface AfTaxonomyResponse {
  search: {
    offset: number
    limit: number
  }
  total: { value: number }
  result: [AfTaxonomyResult]
}

export const taxonomy: QueryResolvers['taxonomy'] = async (
  _,
  { params },
  { dataSources: { taxonomyAPI } }
) => {
  const taxonomyQuery =
    params && params.parentId
      ? (renameKeys({ parentId: 'parent-id' }, params) as any)
      : params

  try {
    const data = await taxonomyAPI.getData<AfTaxonomyResponse>(taxonomyQuery)
    const total = data.total.value

    return {
      total,
      search: data.search,
      result: data.result.map(x => ({
        taxonomyId: x.conceptId,
        ...x,
      })),
    }
  } catch (error) {
    throw new Error(error)
  }
}
