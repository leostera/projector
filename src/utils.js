//@flow

import _meta from 'projector/metadata'

const _now_time = () => (new Date()).toTimeString().split(' ')[0]
const tick = () => window.performance.now()|0
const now  = () => `${_now_time()}:${tick()}`

const log = (...args: any[]): void => {
  // @todo: use ${NODE_ENV} here instead
  // let envsubst do the job
  (_meta.Env !== "production")
    && console.log(now(), ...args)
}

log.ns = (namespace: string): void => log.bind({}, namespace)

const error: Function = log.ns("ERROR:")
const info:  Function = log.ns("INFO:")

const pluck = (key: string): Function => {
  const keys = key.split(".")
  const traverse = (obj, keys) => {
    const k = keys.shift()
    if(keys.length == 0) return obj[k]
    return traverse(obj[k], keys)
  }
  return (obj) => {
    return traverse(obj, keys)
  }
}

export {
  log,
  error,
  pluck,
  info,
}
