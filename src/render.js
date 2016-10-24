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

import { Markdown } from 'projector/components/Markdown'

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

const IssueComponent = ({id,body,title,labels}: Issue) => (
  <section key={id} id={id} className="issue">
    <section className="issue-title">
      {title} { labels.map(LabelComponent) }
    </section>
    { body && body.length > 0 && <Markdown className="issue-body" body={body} /> }
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

const Nav = () => (
  <header>
    <nav>
      <a href="" className="brand">{emojify(":film_projector:")}</a>
    </nav>
  </header>
)

const Footer = () => (
  <footer>
    Made with <span className="solid-emoji">{emojify(":heart:")}</span> by <a href="https://github.com/ostera">@ostera</a>
  </footer>
)

const Content = ({repos}) => (
  <section className="content">
    <Nav />
      { repos }
    <Footer />
  </section>
)

const Loading = () => (
  <section className="loading">
    <span className="solid-emoji">{emojify(":film_projector:")}</span>
  </section>
)

export default ({loading, repositories}: State): void => {
  log(loading)
  const repos = repositories && repositories.get().map( RepositoryComponent )
  try {
    ReactDOM.render((
      <section>
        { !loading && <Content repos={repos} /> || <Loading /> }
      </section>
    ), document.getElementById('projector'))
  } catch (e) {
    error(e)
  }
}
