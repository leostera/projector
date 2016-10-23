//@flow

import { log, error } from 'projector/utils'

import type {
  Issue,
  Milestone,
  Repository,
  State
} from 'projector/Types'

import React from 'react'
import ReactDOM from 'react-dom'

const IssueComponent = (issue: Issue) => (
  <section key={issue.id} id={issue.id} className={issue.state}>
    <h4>{issue.title}</h4>
  </section>
)

const MilestoneComponent = (milestone: Milestone) => (
  <section key={milestone.id} id={milestone.id} className="milestone">
    <h3> {milestone.title} </h3>
    <section className="issues">
      { milestone.issues.map(IssueComponent) }
    </section>
  </section>
)

const RepositoryComponent = (repo: Repository) => (
  <section key={repo.id} id={repo.name} className="repository">
    <h2> {repo.name} </h2>
    { repo.milestones.map(MilestoneComponent) }
  </section>
)

export default ({repositories}: State): void => {
  const repos = repositories && repositories.get().map( RepositoryComponent )
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
