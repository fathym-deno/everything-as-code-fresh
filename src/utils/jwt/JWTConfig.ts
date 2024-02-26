import { djwt } from "../../src.deps.ts";

export type JWTConfig = {
  Algorithm: AlgorithmIdentifier;

  Create: (data: Record<string, unknown>, expTime?: number) => Promise<string>;

  Decode: <T>(
    token: string,
  ) => Promise<[header: unknown, payload: T, signature: Uint8Array]>;

  ExpirationTime: number;

  Header: string;

  JWK: JsonWebKey;

  KeyUsages: KeyUsage[];

  LoadToken: (req: Request) => string | undefined;

  SecretKey: () => Promise<CryptoKey>;

  Schema: string;

  Type: "JWT";

  Verify: (token: string) => Promise<djwt.Payload>;
};
