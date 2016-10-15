//@flow

/*******************************************************************************
 * Imports
 *******************************************************************************/

import type { History, Location } from 'history'

/*******************************************************************************
 * Public API
 *******************************************************************************/

export default function *stream(history: History): Generator<Location, void, void> {
  let self = this
  // Listen to history changes
  history.listen( (location) => {
    //p Push history changed back up into the generator
    self.next(location)
  })
  while(true) { console.log(yield) }
}
