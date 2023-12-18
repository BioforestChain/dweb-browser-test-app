import { BasePlugin } from '@plaoc/plugins'
import type { $MMID } from '@plaoc/plugins'
import manifest from '../../manifest.json'

export type Result = {
  success: boolean
  message: string
}

export type Log = {topic: string, data: any}

class SubPub extends BasePlugin {
  sub<T>(data: string) {
    return this.fetchApi('/sub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    }).object<T>()
  }

  pub<T>(data: string) {
    return this.fetchApi('/pub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    }).object<T>()
  }

  logs<T>() {
    return this.fetchApi('/keyval', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).object<T>()
  }
}

const pubsub = new SubPub(manifest.id as $MMID)
export default pubsub
