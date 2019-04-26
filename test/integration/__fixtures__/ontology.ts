export const ontologyConcepts = [
  {
    id: '0c100faf-5197-5e04-8b6c-964bff1987ee',
    term: '111 mmb',
    type: 'SKILL',
  },
  {
    id: '54927eca-d9b3-5ba8-9492-85281d80af23',
    term: '11g databashanterare',
    type: 'SKILL',
  },
  {
    id: 'ed1d4d4c-ea8c-567e-a04b-2984a61f23d0',
    term: '15n',
    type: 'SKILL',
  },
  {
    id: 'c6e1faf1-4ff1-5cca-a6ac-fa58b68939aa',
    term: '16 mm film',
    type: 'SKILL',
  },
  {
    id: '663fc6cb-e4f0-5777-b9ac-4ca490645769',
    term: '1st line',
    type: 'SKILL',
  },
  {
    id: 'a4c16f7b-761a-5758-881e-dabbb82e8952',
    term: '1xevdo',
    type: 'SKILL',
  },
  {
    id: 'ec439c72-e29c-5714-ad67-48a5e72a58e4',
    term: '1xrtt',
    type: 'SKILL',
  },
  {
    id: 'c625dcc2-9dfc-5172-8aa5-f331b58e48d7',
    term: '2-färgstryck',
    type: 'SKILL',
  },
  {
    id: '7c77ceef-afe3-5641-8003-ce8ae19156e5',
    term: '2003 server',
    type: 'SKILL',
  },
  {
    id: '21717f15-07b7-5ea1-8e1f-722b10be7fe6',
    term: '24seven office',
    type: 'SKILL',
  },
]

export const ontologyConcept = {
  id: 'b8460092-7c21-5769-80de-d9b94d142839',
  term: 'Snickare',
  type: 'OCCUPATION',
  terms: [
    {
      term: 'snickare',
      type: 'occupation',
    },
  ],
}

export const ontologyRelatedByConcept = {
  concepts: [
    {
      id: 'b8460092-7c21-5769-80de-d9b94d142839',
      name: 'Snickare',
      type: 'OCCUPATION',
    },
  ],
  count: 10,
  relations: [
    {
      details: { word2Vec: 0.754490077495575 },
      id: 'c9889431-eccf-5273-8e84-85d9ab6ffecb',
      name: 'Köksmontering',
      score: 0.754490077495575,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7544764280319214 },
      id: '5ed4409a-394b-5e07-80b7-ec907d42da91',
      name: 'Träarbetare med yrkesbevis',
      score: 0.7544764280319214,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7523693442344666 },
      id: '1201492d-75c7-55d9-bc62-a7802d755ec5',
      name: 'Fönstermontage',
      score: 0.7523693442344666,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7451319694519043 },
      id: '79ae8e28-889d-5415-bbd1-07187fdeaf30',
      name: 'Våtrumscertifikat',
      score: 0.7451319694519043,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7357150912284851 },
      id: 'a3792a98-ef5f-5207-8091-09008a958b3f',
      name: 'Träarbeten',
      score: 0.7357150912284851,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7315484881401062 },
      id: '585cdb61-3621-5b12-b5d6-781f31b55829',
      name: 'Innerväggar',
      score: 0.7315484881401062,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7305789589881897 },
      id: '01571ec9-4994-5fdf-aefa-bccfdc04aa1b',
      name: 'Badrumsrenovering',
      score: 0.7305789589881897,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7299546003341675 },
      id: 'e4077f4a-bc6f-5c14-9a36-6d913cca1a47',
      name: 'Köksmontage',
      score: 0.7299546003341675,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.727815568447113 },
      id: '2645b9fa-ddc7-5f17-8148-5c2390d1ef8f',
      name: 'Våtrumsbehörighet',
      score: 0.727815568447113,
      type: 'SKILL',
    },
    {
      details: { word2Vec: 0.7276741862297058 },
      id: '7da72960-f57d-5838-a8a6-75589979e3d5',
      name: 'Inredningssnickeri',
      score: 0.7276741862297058,
      type: 'SKILL',
    },
  ],
}

export const ontologyTextParse = [
  {
    id: '71b069a1-b9f6-5627-b045-758e633fecf8',
    name: 'Duktig',
    terms: ['duktig'],
    type: 'TRAIT',
  },
  {
    id: 'c2ca83f2-4cd3-586f-a00f-ffa6cb148367',
    name: 'Batman',
    terms: ['batman'],
    type: 'SKILL',
  },
  {
    id: 'b8460092-7c21-5769-80de-d9b94d142839',
    name: 'Snickare',
    terms: ['snickare'],
    type: 'OCCUPATION',
  },
  {
    id: '46e21901-5221-5310-8f18-224efe2ff930',
    name: 'Matlagning',
    terms: ['matlagning'],
    type: 'SKILL',
  },
  {
    id: 'c4e275e9-0126-5d62-815d-5e0857f51711',
    name: 'Passion',
    terms: ['passion'],
    type: 'TRAIT',
  },
]
