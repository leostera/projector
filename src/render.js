//@flow

import { log, error } from 'projector/utils'

import type {
    Issue,
    Label,
    Milestone,
    Repository,
    State,
} from 'projector/Types'

import emojify from 'projector/lib/gemoji'

import React from 'react'
import ReactDOM from 'react-dom'

const LabelStyles = (label: Label) => ({
  backgroundColor: `#${label.color}`
})
const LabelComponent = (label: Label) => (
  <section key={label.id}
    className="label"
    style={LabelStyles(label)}  >
    {label.name}
  </section>
)

const IssueComponent = (issue: Issue) => (
  <section key={issue.id} id={issue.id} className="issue">
    {issue.title}
    { issue.labels.map(LabelComponent) }
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
    <section className="header">
      <h2>{repo.name}</h2>
      <span>{emojify(repo.description)}</span>
    </section>
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
