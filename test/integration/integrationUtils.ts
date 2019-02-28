export interface options {
  context: any
}

import { createTestClient } from 'apollo-server-testing'

export const getClient = (
  server,
  options?: options
): { query: Function; mutate: Function } => {
  if (options && options.context) {
    // @ts-ignore
    const context = server.context({})

    // @ts-ignore
    server.context = () => ({
      ...context,
      ...options.context,
    })
  }

  const client = createTestClient(server)

  return { mutate: client.mutate, query: client.query }
}
