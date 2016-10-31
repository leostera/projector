//@flow

import Baobab from 'baobab'

import { just } from 'most'

import { log, error, pluck } from 'projector/utils'

import type { State, Meta } from 'projector/Types'
import _meta from 'projector/metadata'

import * as Github from 'projector/Github'

const project_count = () => Github.query(`
  viewer {
    contributedRepositories {
      totalCount
    }
  }
`).map(pluck("viewer.contributedRepositories.totalCount"))

const projects = (last) => Github.query(`
  viewer {
    contributedRepositories(last: ${last}) {
      edges {
        node {
          id
          name
          description
          url
          issues(last: 30) {
            edges {
              node {
                id
                title
                number
                labels(first: 30) {
                  edges {
                    node {
                      color
                      id
                      name
                    }
                  }
                }
                repository {
                  url
                }
                milestone {
                  id
                }
                state
              }
            }
          }
          milestones(last: 30) {
            edges {
              node {
                id
                url
                state
                title
                description
                dueOn
                closedIssueCount
                openIssueCount
                repository {
                  url
                }
                createdBy {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`).map(pluck("viewer.contributedRepositories.edges"))
  .map( res => res.map( r => r.node ) )
  .map( node => node.map( n => {
    n.issues = n.issues.edges.map( e => {
      e.node.labels = e.node.labels.edges.map( e => e.node )
      return e.node
    })
    n.milestones = n.milestones.edges
      .map( e => e.node )
      .map( m => {
        m.issues = n.issues.filter( i => i.milestone && i.milestone.id === m.id && i.state === "OPEN" )
        return m
      })
      .filter( m => m.issues.length > 0 )
    return n
  }) )
  .map( res => (res.filter( p => p.milestones.length > 0 )) )

const init = (state: State, location: Location): State => {
  const cache = (a: State) => {
    localStorage.setItem('state', JSON.stringify(a))
  }

  let data = projects(30)
    .map( data => (new Baobab(data)) )
    .map( data => ({
      ...state,
      loading: !!!data,
      repositories: data
    }))
    .tap(cache)

  let cached_data = JSON.pasre(localStorage.getItem('state'))

  console.log(cached_data)

  return just({ ...state, loading: true })
    .concat(data)
    .tap(log.ns("Projector:"))
}

export { init }
