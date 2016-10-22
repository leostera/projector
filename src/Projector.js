import { log, error, pluck } from 'projector/utils'

import type { State, Meta } from 'projector/Types'
import _meta from 'projector/metadata'

import * as Github from 'projector/Github'

const project_count = () => {
  return Github.query(`
    viewer {
      contributedRepositories {
        totalCount
      }
    }
  `).map(pluck("viewer.contributedRepositories.totalCount"))
}

const init = (state: State, location: Location): State => {
  project_count()
    .observe(log)
  return state
}

export { init }
