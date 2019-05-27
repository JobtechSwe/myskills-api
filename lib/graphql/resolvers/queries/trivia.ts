import { QueryResolvers } from '../../../__generated__/myskills'

const fakeApi = (occupation: string) => {
  const data: any = {
    systemutvecklare: {
      info:
        'En systemutvecklare kan arbeta med utveckling av allt från ekonomisystem till system för att styra industriproduktion. Den närmsta tiden kommer det att vara mycket liten konkurrens bland systemutvecklare. Försäkringskassans IT-avdelning är en av de största i Sverige.',
      source: 'framtid.se',
    },
    lärare: {
      info:
        'I Sverige är lärare sedan den 1 juli 2011 ett legitimationsyrke. Ett krav för att arbeta i skola eller förskola i Sverige är ett rent belastningsregister. Arbetsmarknaden för lärare förväntas vara mycket god på fem till tio års sikt.',
      source: 'framtid.se',
    },
    florist: {
      info:
        'Floristens arbete har inslag av både försäljning, administration och konstnärligt arbete. Gröna fingrar och blick för färg och form är mycket viktiga egenskaper för en florist. Framtidsutsikterna för florister är kopplade till hur det går för blomsterhandeln som i sin tur påverkas av hushållens ekonomi.',
      source: 'framtid.se',
    },
  }

  const info = data[occupation.toLowerCase()]

  if (info) {
    return info
  } else {
    return {
      info: null,
      source: null,
    }
  }
}

export const trivia: QueryResolvers['trivia'] = async (
  _,
  { occupation },
  _context
) => {
  try {
    return fakeApi(occupation)
  } catch (e) {
    throw new Error(e)
  }
}
