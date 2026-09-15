import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  external: [
    "@provenara/core",
    "@provenara/services",
    "@provenara/adapters",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/credential-providers",
    "fastify",
    "undici",
  ],
});
