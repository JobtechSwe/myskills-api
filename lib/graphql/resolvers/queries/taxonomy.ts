import { QueryResolvers, TaxonomyType } from '../../../__generated__/myskills'

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
  total: number
  result: [AfTaxonomyResult]
}

const renameProp = (
  oldProp: string,
  newProp: string,
  { [oldProp]: old, ...others }: any
) =>
  old
    ? {
        ...others,
        [newProp]: old,
      }
    : { ...others }

export const taxonomy: QueryResolvers['taxonomy'] = async (
  _,
  { params },
  { dataSources: { taxonomyAPI } }
) => {
  const taxonomyQuery =
    params && params.parentId
      ? renameProp('parentId', 'parent-id', params)
      : params

  try {
    const data = await taxonomyAPI.getData<AfTaxonomyResponse>(taxonomyQuery)
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
