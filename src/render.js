//@flow
import { log, error } from 'projector/utils'

import React from 'react'
import ReactDOM from 'react-dom'

export default (state) => {
  try {
    ReactDOM.render((
      <section>
      </section>
    ), document.getElementById('projector'))
  } catch (e) {
    error(e)
  }
}
