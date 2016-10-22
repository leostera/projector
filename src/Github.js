import { log, pluck } from 'projector/utils'

import { fromPromise } from 'most'
import 'whatwg-fetch'

import _meta from 'projector/metadata'

const GITHUB_TOKEN = _meta.Tokens.Github
const GITHUB_API = 'https://api.github.com/graphql'

const query = (ql) => {
  const _wrapped_query = `query { ${ql.split('\n').join('')} }`
  const request_data = {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: _wrapped_query
    })
  }
  return fromPromise(fetch(GITHUB_API, request_data))
    .concatMap( (r) => fromPromise(r.json()) )
    .map(pluck("data"))
    .tap(log.bind({},"Github Response:"))
}

export { query }
