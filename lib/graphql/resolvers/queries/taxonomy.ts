import {
  QueryResolvers,
  TaxonomyResponse,
  TaxonomyQueryArgs,
} from '../../../__generated__/myskills'

export const taxonomy: QueryResolvers.TaxonomyResolver = async (
  _,
  args: TaxonomyQueryArgs,
  { dataSources: { taxonomyAPI } }
) => {
  try {
    const data = await taxonomyAPI.getData<TaxonomyResponse>(args.params || {})

    return data
  } catch (error) {
    throw new Error(error)
  }
}
