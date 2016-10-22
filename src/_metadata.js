export type Meta = {
  Version:  string;
  Revision: string;
}

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
