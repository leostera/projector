//@flow
import { log, error } from 'projector/utils'

import type t from 'projector/Types'

import React from 'react'
import ReactDOM from 'react-dom'

const Issue = (issue) => (
  <section key={issue.key} id={issue.id} className={issue.state}>
    <h4>{issue.title}</h4>
  </section>
)

const Milestone = (milestone: t.Milestone) => (
  <section key={milestone.id} id={milestone.name} className="milestone">
    <h3> {milestone.title} </h3>
    <section className="issues">
      { milestone.issues.map(Issue) }
    </section>
  </section>
)

const Repo = (repo: t.Repository) => (
  <section key={repo.id} id={repo.name} className="repository">
    <h2> {repo.name} </h2>
    { repo.milestones.map(Milestone) }
  </section>
)

export default (state: t.State): void => {
  log("Renderer:", state)
  const repos: [t.Repository] = state.get().map( Repo )
  try {
    ReactDOM.render((
      <section>
         { repos }
      </section>
    ), document.getElementById('projector'))
  } catch (e) {
    error(e)
  }
}
