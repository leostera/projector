//@flow

/*******************************************************************************
 * Imports
 *******************************************************************************/

import type { History, Location } from 'history'

import type { Sink, Scheduler } from 'most'
import { Stream } from 'most'

/*******************************************************************************
 * Public API
 *******************************************************************************/

let log  = (...args: any[]): void => {
  (process.env.NODE_ENV !== "production") && console.log((new Date()).toTimeString().split(' ')[0], ...args)
}
let error: Function = log.bind("ERROR")
let done:  Function = log.bind("DONE")

export default function (history: History): Stream<Location> {
  return new Stream({
    run: (sink: Sink<Location>, scheduler: Scheduler) =>  {
      let push = (l) => sink.event(scheduler.now, l)
      let unlisten = history.listen(push)
      // Push in the current location
      setTimeout(() => {
        sink.event(scheduler.asap(), history.getCurrentLocation())
      }, 0)
      return {
        dispose: () => {
          unlisten()
          sink.end(scheduler.now())
        }
      }
    }
  })
}
