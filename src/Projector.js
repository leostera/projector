import { log, error } from 'projector/utils'

import type { State, Meta } from 'projector/Types'
import _meta from 'projector/metadata'

import * as Github from 'projector/Github'

const init = (state: State, location: Location): State => {
  Github.query(`
    viewer {
      login
      repositories(first: 30) {
        edges {
          node {
            description
            owner {
              id
            }
            issues(first: 3) {
              totalCount
              edges {
                node {
                  title
                  body
                }
              }
            }
          }
        }
      }
    }
  `)
  return state
}

export { init }
