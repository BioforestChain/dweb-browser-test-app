import { Router } from '@plaoc/server/middleware'
import { set } from 'idb-keyval';

import { jsProcess, streamReadAllBuffer, $IpcEvent, $Ipc } from '@dweb-browser/js-process'

const app = new Router()

// 监听其它模块发的IpcRequest
app.use(async (event) => {
  console.log('test app external:=>', event.request)

  // 记录日志
  const headers = []
  for (let pair of event.request.headers.entries()) {
    headers.push(pair[0]+':'+pair[1])
  }

  let body = ''
  if (event.body) {
    body = new TextDecoder().decode(await streamReadAllBuffer(event.body))
  }

  const req = {
    method: event.request.method,
    url: event.request.url,
    headers: headers,
    body: body
  }

  const now = new Date()
  const key = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`

  set(key, req)

  return Response.json({status: 200, message: "this is test app response"})
})

type IpcEventBody = {
  topic: string
  data: string | Uint8Array
}

// 监听其它模块发的IpcEvent
jsProcess.onActivity((event: $IpcEvent, ipc: $Ipc) => {

  let body: IpcEventBody
  try {
    body = JSON.parse(event.text)
  } catch (error) {
    console.error('event data invalid: ', event.data)
    return
  }

  const eventDesc = {
    topic: body.topic,
    data: body.data
  }

  const now = new Date()
  const key = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  set(key, eventDesc)

  console.log('test app onActivity: ', eventDesc, event, ipc)
})



export default app
