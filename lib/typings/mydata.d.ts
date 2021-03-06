declare module '@mydata/client' {
  type KeyValue = {
    [key: string]: any
  }

  interface KeyValueStore {
    load: (key: string) => Promise<string | null>
    remove: (key: string) => Promise<number>
    save: (key: string, value: string, ttl: number) => Promise<void>
  }

  interface Options {
    clientId: string
    clientKeys: ClientKeys
    description: string
    displayName: string
    eventsPath: string
    jwksPath: string
    keyValueStore: KeyValueStore
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

  export interface Consent {
    consentId: string
    consentRequestId: string
    accessToken: string
  }

  export interface Login {
    sessionId: string
    accessToken: string
  }

  type EventsCallback<T> = (consent: T) => void

  interface Events {
    on: <T = Login | Consent>(name: string, cb: EventsCallback<T>) => void
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
