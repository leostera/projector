const _now_time = () => (new Date()).toTimeString().split(' ')[0]
const tick = () => performance.now()|0
const now = () => `${_now_time()}:${tick()}`

const log = (...args: any[]): void => {
  (process.env.NODE_ENV !== "production")
    && console.log(now(), ...args)
}

const error: Function = log.bind("ERROR")

export { log, error }
