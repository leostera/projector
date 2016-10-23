//@flow

/*******************************************************************************
 * Imports
 *******************************************************************************/

import { log, error } from 'projector/utils'

import type { History, Location } from 'history'

import type { Sink, Scheduler } from 'most'
import { Stream } from 'most'

/*******************************************************************************
 * Public API
 *******************************************************************************/

export default function (history: History): Stream<Location> {
  return new Stream({
    run: (sink: Sink<Location>, scheduler: Scheduler) =>  {
      let push = (l) => sink.event(scheduler.now(), l)
      let unlisten = history.listen(push)
      return {
        dispose: () => {
          unlisten()
          sink.end(scheduler.now())
        }
      }
    }
  })
}
