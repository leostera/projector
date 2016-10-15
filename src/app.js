//@flow
import 'babel-polyfill'
import { log, error } from 'projector/utils'

export type Meta = {
  Version:  string;
  Revision: string;
}

const _meta: Meta = {
  Env: `${process.env.NODE_ENV}`,
  Version: `${process.env.VERSION}`,
  Revision: `${process.env.REVISION}`
}

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

type State = {
  _meta: Meta;
  location: Location;
}

const samePath = (a: Location, b: Location): boolean =>
  a.pathname === b.pathname

const initialState = (state, location: Location): State => ({
  ...state,
  _meta,
  location
})

let glue = from(history)
  .skipRepeatsWith(samePath)
  .scan(initialState, {})
  .tap(log)
  .observe(log)
