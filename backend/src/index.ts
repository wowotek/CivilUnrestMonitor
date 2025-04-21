import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import type { ServerWebSocket } from 'bun'

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>()

//@ts-ignore
const app = new Hono({websocket});

app.get(
    '/ws',
    upgradeWebSocket((c) => {
      return {
        onOpen: (event, ws) => {
          console.log('Connection opened')
          ws.send('Hello from server!')
        },
        onMessage(event, ws) {
          console.log(`Message from client: ${event.data}`)
          ws.send('Hello from server!')
        },
        onClose: () => {
          console.log('Connection closed')
        },
      }
    })
  )

export default {
  fetch: app.fetch,
  websocket,
}