import { fromPromise } from 'most'
import 'whatwg-fetch'

import { log } from 'projector/utils'
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
}

export { query }
