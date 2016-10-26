//@flow

import 'babel-polyfill'
import { log, error } from 'projector/utils'

import { from } from 'most'

import createHistoryStream from 'projector/lib/history.stream'
import type { History, Location } from 'history'
import createHistory from 'history/lib/createBrowserHistory'

import _meta from 'projector/metadata'
import * as Projector from 'projector/Projector'
import render from 'projector/render'

/*******************************************************************************
 * Private
 *******************************************************************************/

let __history: History = createHistory()
let location: Location = __history.getCurrentLocation()
let history = createHistoryStream(__history)

/*******************************************************************************
 * Glue!
 *******************************************************************************/

const sameLocation = (a: Location, b: Location): boolean => (
  a.pathname === b.pathname
    && a.hash   === b.hash
    && a.action === b.action
    && a.search === b.search
)

const initialState = {
  _meta,
  location
}

let glue = from(history)
  .scan(Projector.init, Projector.init(initialState, location))
  .join()
  .observe(render)
