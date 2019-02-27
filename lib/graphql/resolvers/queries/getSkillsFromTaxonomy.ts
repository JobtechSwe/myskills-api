import {
  QueryResolvers,
  TaxonomySkillsResponse,
  TaxonomyQueryInput,
} from '../../../__generated__/myskills'
import { get } from '../../../adapters/taxonomy'

export const getSkillsFromTaxonomy: QueryResolvers.GetSkillsFromTaxonomyResolver = async (
  _,
  args: TaxonomyQueryInput
) => {
  const data = await get<TaxonomySkillsResponse>(args)
  return data
}
