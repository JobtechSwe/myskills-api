declare module '@mydata/client' {
  interface Options {
    clientId: string
    clientKeys: ClientKeys
    description: string
    displayName: string
    eventsPath: string
    jwksPath: string
    keyValueStore: any
    operator: string
  }

  interface ClientKeys {
    privateKey: string
    publicKey: string
  }

  function create(options: Options): any
}

declare enum Area {
  languages,
  educations,
  experiences,
  skills,
}
