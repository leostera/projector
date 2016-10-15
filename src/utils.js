const now = () => (new Date()).toTimeString().split(' ')[0]

const log = (...args: any[]): void => {
  (process.env.NODE_ENV !== "production")
    && console.log(now(), ...args)
}

const error: Function = log.bind("ERROR")

export { log, error }
