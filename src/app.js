//@flow
import 'babel-polyfill'

const Version  = process.env.VERSION
const Revision = process.env.REVISION

import type { Stream } from 'most'
import { from } from 'most'

import createHistoryStream from 'projector/lib/history.stream'
import createHistory from 'history/lib/createBrowserHistory'

// import { State } from 'projector/State'

// import render from 'projector/render'

/*******************************************************************************
 * Private
 *******************************************************************************/

let __history: History = createHistory()
let history = createHistoryStream(__history)

let log  = (...args: any[]): void => {
  (process.env.NODE_ENV !== "production") && console.log((new Date()).toTimeString().split(' ')[0], ...args)
}
let error: Function = log.bind("ERROR")
let done:  Function = log.bind("DONE")

/*******************************************************************************
 * Glue!
 *******************************************************************************/

const samePath = (a: Location, b: Location): boolean =>
  a.pathname === b.pathname

let state = from(history)
  .skipRepeatsWith(samePath)
  .timestamp()
  .tap(log)
  .map( (o) => o.value.pathname )
  .observe(log)

setTimeout(() => { __history.push("/no-way") },500)
setTimeout(() => { __history.push("/no-way") },750)
setTimeout(() => { __history.push("/jo-say") },900)
