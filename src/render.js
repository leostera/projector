//@flow
import { log, error } from 'projector/utils'

import type { State } from 'projector/Types'

import React from 'react'
import ReactDOM from 'react-dom'

const Repo = () => (
  <section className="repository">
    <h2> tldr.jsx </h2>
    <section className="milestone">
      <h3> v3 </h3>
      <section className="issues">
        <section className="issue">
          <h4>Needless horizontal scroll on smalls screens</h4>
        </section>
        <section className="issue">
          <h4>Unigrid</h4>
        </section>
        <section className="issue">
          <h4>Add night-mode by applying a top-level class that redefines the color palette</h4>
        </section>
      </section>
    </section>
    <section className="milestone">
      <h3> v4 </h3>
      <section className="issues">
        <section className="issue">
          <h4>Move to tldr.sh</h4>
        </section>
        <section className="issue">
          <h4>Platform Detection</h4>
        </section>
        <section className="issue">
          <h4>Command Suggestion</h4>
        </section>
      </section>
    </section>
  </section>
)

export default (state: State): void => {
  try {
    ReactDOM.render((
      <section>
        <Repo />
      </section>
    ), document.getElementById('projector'))
  } catch (e) {
    error(e)
  }
}
