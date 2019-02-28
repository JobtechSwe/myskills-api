import {
  QueryResolvers,
  TaxonomyResponse,
  TaxonomyQueryArgs,
} from '../../../__generated__/myskills'
import { get } from '../../../adapters/taxonomy'

export const taxonomy: QueryResolvers.TaxonomyResolver = async (
  _,
  args: TaxonomyQueryArgs
) => {
  try {
    const data = await get<TaxonomyResponse>(args.params || {})
    return data
  } catch (error) {
    throw new Error(error)
  }
}
