import {
  QueryResolvers,
  TaxonomySkillsResponse,
  GetSkillsFromTaxonomyQueryArgs,
} from '../../../__generated__/myskills'
import { get } from '../../../adapters/taxonomy'

export const getSkillsFromTaxonomy: QueryResolvers.GetSkillsFromTaxonomyResolver = async (
  _,
  args: GetSkillsFromTaxonomyQueryArgs
) => {
  const data = await get<TaxonomySkillsResponse>(args.params || {})
  return data
}
