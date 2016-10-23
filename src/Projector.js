//@flow

import Baobab from 'baobab'

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
          issues(last: 30) {
            edges {
              node {
                id
                body
                title
                number
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
                state
                title
                description
                dueOn
                closedIssueCount
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
    n.issues = n.issues.edges.map( e => e.node )
    n.milestones = n.milestones.edges
      .map( e => e.node )
      .map( m => {
        m.issues = n.issues.filter( i => i.milestone && i.milestone.id === m.id )
        return m
      })
    return n
  }) )
  .map( res => (res.filter( p => p.milestones.length > 0 )) )

const init = (state: State, location: Location): State => {
  return projects(30)
    .map( data => new Baobab(data) )
    .tap(log.ns("Projector:"))
}

export { init }
