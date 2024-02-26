import { JWTConfig } from "./JWTConfig.ts";

export async function generateKeyValue(
  jwtConfig: JWTConfig,
): Promise<JsonWebKey> {
  const key = await crypto.subtle.generateKey(
    jwtConfig.Algorithm,
    true,
    jwtConfig.KeyUsages,
  );

  return await crypto.subtle.exportKey("jwk", key);
}
