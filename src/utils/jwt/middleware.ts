import {
  FreshContext,
  JWTConfig,
  respond,
  STATUS_CODE,
} from "../../src.deps.ts";

export function buildJwtValidationHandler<TPayload>(jwtConfig: JWTConfig) {
  return async function jwtValidateHandler(req: Request, ctx: FreshContext) {
    if (req.method !== "OPTIONS") {
      const jwtToken = jwtConfig.LoadToken(req);

      const failureRespBody = { HasError: false, Message: "" };

      if (!jwtToken) {
        failureRespBody.Message =
          `A JWT token is required, provide it in the '${jwtConfig.Header}' header in the format '${jwtConfig.Schema} {token}'.`;
      }

      try {
        if (!(await jwtConfig.Verify(jwtToken!))) {
          failureRespBody.Message = "The provided token is invalid.";

          failureRespBody.HasError = true;
        }
      } catch (err) {
        console.error(err);

        failureRespBody.HasError = true;

        failureRespBody.Message = err.message;
      }

      if (failureRespBody.HasError) {
        return respond(failureRespBody, {
          status: STATUS_CODE.Unauthorized,
        });
      }

      const [_header, payload] = await jwtConfig.Decode<TPayload>(jwtToken!);

      ctx.state = {
        ...(ctx.state || {}),
        ...(payload || {}),
        JWT: jwtToken,
      };
    }

    return ctx.next();
  };
}
