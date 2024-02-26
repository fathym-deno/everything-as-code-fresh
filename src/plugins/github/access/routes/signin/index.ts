import { Handlers, OAuthHelpers } from "../../../../../src.deps.ts";

export function establishSigninRoute(oAuthHandlers: OAuthHelpers) {
  const handler: Handlers = {
    async GET(req, _ctx) {
      return await oAuthHandlers.signIn(req);
    },
  };

  return { handler, component: undefined };
}
