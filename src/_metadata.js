import type { Meta } from 'projector/Types'

const _meta: Meta = {
  Env: "${NODE_ENV}",
  Version: "${VERSION}",
  Revision: "${REVISION}",
  Stamp: "${STAMP}",
  Tokens: {
    Mixpanel: "${MIXPANEL_TOKEN}"
  }
}

export default _meta
