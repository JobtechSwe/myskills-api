declare module '@mydata/client' {
  type KeyValue = {
    [key: string]: any
  }

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

  interface Auth {
    read: <T = KeyValue>(config: any) => Promise<T>
    write: <T = KeyValue>(config: any) => Promise<T>
  }

  type Connect = () => void

  interface Data {
    auth: (token: string) => Auth
  }

  interface Consents {
    request: <T = any>(request: KeyValue) => Promise<T>
  }

  type EventsCallback = (consent: any) => void

  interface Events {
    on: (name: string, cb: EventsCallback) => void
  }

  interface Create {
    connect: Connect
    consents: Consents
    data: Data
    events: Events
    routes: any
  }

  function create(options: Options): Create
}

declare enum Area {
  languages,
  educations,
  experiences,
  skills,
}
