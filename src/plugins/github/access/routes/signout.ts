import { Handlers, OAuthHelpers } from "../../../../src.deps.ts";

export function establishSignoutRoute(oAuthHandlers: OAuthHelpers) {
  const handler: Handlers = {
    async GET(req, _ctx) {
      return await oAuthHandlers.signOut(req);
    },
  };

  return { handler, component: undefined };
}
