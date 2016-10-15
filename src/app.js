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

const sameLocation = (a: Location, b: Location): boolean => (
  a.pathname === b.pathname
    && a.hash   === b.hash
    && a.action === b.action
    && a.search === b.search
)

const initialState: State = {
  _meta,
  location: __history.getCurrentLocation()
}

const build = (state, location: Location): State => ({
  ...state,
  location
})

let glue = from(history)
  .skipRepeatsWith(sameLocation)
  .scan(build, initialState)
  .observe(render)
