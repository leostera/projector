//@flow
import 'babel-polyfill'
import { log, error } from 'projector/utils'

const Version  = process.env.VERSION
const Revision = process.env.REVISION

import { from } from 'most'

import createHistoryStream from 'projector/lib/history.stream'
import createHistory from 'history/lib/createBrowserHistory'

import render from 'projector/render'

/*******************************************************************************
 * Private
 *******************************************************************************/

let __history: History = createHistory()
let history = createHistoryStream(__history)

/*******************************************************************************
 * Glue!
 *******************************************************************************/

const samePath = (a: Location, b: Location): boolean =>
  a.pathname === b.pathname

let glue = from(history)
  .skipRepeatsWith(samePath)
  .timestamp()
  .map( (o) => o.value.pathname )
  .observe(render)
