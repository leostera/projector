import type { Meta } from 'projector/Types'

const _meta: Meta = {
  Env: "${NODE_ENV}",
  Version: "${VERSION}",
  Revision: "${REVISION}",
  Stamp: "${STAMP}",
  Tokens: {
    Mixpanel: "${MIXPANEL_TOKEN}",
    Github: "8a62d4ae6a8a0e014f12796ff4af8dd0ba55cdff"
  }
}

export default _meta
