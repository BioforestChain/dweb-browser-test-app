
export default class PubSub {
  constructor(addr: string) {

  }

  sub(topic: string, cb: $Callback) {

  }

  pub(topic: string, data: string) {
  }

}

const pubSub = new PubSub('pubsubmodule.bagen.com.dweb')


export type $Callback<ARGS extends unknown[] = [], RETURN = unknown> = (...args: ARGS) => RETURN;
