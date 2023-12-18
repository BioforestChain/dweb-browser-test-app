import { Router } from '@plaoc/server/middleware'
import { entries } from 'idb-keyval';
import manifest from '../manifest.json'
import { jsProcess, streamReadAllBuffer } from '@dweb-browser/js-process';

const app = new Router()

const prefixPath = `/${manifest.id}`

const pubsubMMID = 'pubsubmodule.bagen.com.dweb'

app.use(async (event) => {
  // console.log('test external:=>', event, event.ipcRequest)

  // TODO event.ipcRequest.ipc.remote问题(remote是http.std.dweb)解决的话，这里可以删掉
  event.headers.append('X-Dweb-Host', manifest.id)
  const { method, pathname } = event

  // console.log('test req body: ', (new TextDecoder().decode(await streamReadAllBuffer(event.body!))) )

  // 处理发布订阅请求
  if ((pathname.startsWith(`${prefixPath}/sub`) || pathname.startsWith(`${prefixPath}/pub`)) && method === 'POST') {
    const url = `http://external.${pubsubMMID}:443${event.pathname}${event.search}`
    const resp = await jsProcess.nativeFetch(url, {
      method: event.method,
      // headers: event.headers,
      headers: undefined, // TODO 使用undefined是为了规避dweb browser的bug（修复后应使用event.headers)
      body: event.body,
    })

    console.log('test resp: ', resp)
    // const body = new TextDecoder().decode(await streamReadAllBuffer(resp.body!))
    // console.log('test resp body: ', body)

    return resp
  }

  if (pathname.startsWith(`${prefixPath}/keyval`) && method === 'GET') {
    const ents = await entries()
    const len = ents.length

    const reqs: never[] = []
    for (let i = len - 1; i > 0; i--) {
      const key = ents[i][0]
      const v = ents[i][1]

      if (isNaN(new Date(key as string).getTime())) {
        continue
      }

      reqs.push({key: `${key}`, val:v} as never)
    }

    return Response.json(reqs)
  }

  if (pathname.startsWith(`${prefixPath}/keyval`) && method === 'POST') {
    // TODO
    return Response.json({ success: true, message: 'ok' })
  }

  return Response.json({ success: true, message: 'api server ok' })
})

console.log('api init backend')

export default app
