//@flow

import { atom as a } from 'projector/utils'

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

const IssueComponent = ({ repository, title, id, labels, number }: Issue) => (
  <section key={id} id={id} className="issue">
    <a href={`${repository.url}/issues/${number}`}>
      <span className="issue-number">#{ number }</span>
      { title }
    </a>
    { labels.map(LabelComponent) }
  </section>
)

const MilestoneComponent = (milestone: Milestone) => (
  <section key={milestone.id} id={milestone.id} className="milestone">
    <h3> <a href={milestone.url}> {milestone.title} </a> </h3>
    <section className="issues">
      { milestone.issues.map(IssueComponent) }
    </section>
  </section>
)

const RepositoryComponent = (repo: Repository) => (
  <section key={repo.id} id={repo.name} className="repository">
    <section className="header">
      <h2><a href={repo.url}>{repo.name}</a></h2>
      <span>{emojify(repo.description)}</span>
    </section>
    { repo.milestones.map(MilestoneComponent) }
  </section>
)

const Nav = ({_meta, push}) => (
  <header>
    <nav>
      <section className="brand">
        <a href="" className="brand">{emojify(":film_projector:")}</a>
        <span className="version">
          <a
            href={`https://github.com/ostera/projector/tree/${_meta.Revision}`}>
            v{_meta.Version}
          </a>
        </span>
      </section>

      <section className="tools">
        <a onClick={push('/sync')}>
          sync
        </a>
      </section>

    </nav>
  </header>
)

const Footer = () => (
  <footer>
    Made with <span className="solid-emoji">{emojify(":heart:")}</span> by <a href="https://github.com/ostera">@ostera</a>
  </footer>
)

const Content = ({_meta, push, repos}) => (
  <section className="content">
    <Nav _meta={_meta} push={push} />
      { repos }
    <Footer />
  </section>
)

const Loading = () => (
  <section className="loading">
    <span className="solid-emoji">{emojify(":film_projector:")}</span>
  </section>
)

export default ({_meta, history, loading, repositories}: State): void => {
  const push =  (a: string) => () => history.push(a)
  const repos = repositories && repositories.get().map( RepositoryComponent )
  try {
    ReactDOM.render((
      <section>
        { !loading
          && <Content _meta={_meta} push={push} repos={repos} />
          || <Loading /> }
      </section>
    ), document.getElementById('projector'))
  } catch (e) {
    error(e)
  }
}
