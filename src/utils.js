//@flow

import _meta from 'projector/metadata'

const _now_time = () => (new Date()).toTimeString().split(' ')[0]
const tick = () => window.performance.now()|0
const now  = () => `${_now_time()}:${tick()}`

const log = (...args: any[]): void => {
  // @todo: use ${NODE_ENV} here instead
  // let envsubst do the job
  ("${NODE_ENV}" !== "production")
    && console.log(now(), ...args)
}

log.ns = (namespace: string): Function => log.bind({}, namespace)

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

const cache = (a: string): Function => (b: {}): void => {
  localStorage.setItem(a, JSON.stringify(b))
}

const uncache = (a: string): any => {
  let val: ?string = localStorage.getItem(a)
  return val && JSON.parse(val)
}

const atom = (...args: Array<string>): Symbol => {
  let keys = args.map(Symbol.for)
  return keys.length === 1 ? keys[0] : keys
}
window.atom = atom

export {
  atom,
  cache,
  error,
  info,
  log,
  pluck,
  uncache,
}
