// app/utils/auth-client.ts
import { createAuthClient } from "better-auth/vue"
//import { passkeyClient } from "@better-auth/passkey/client"
import { lastLoginMethodClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: "http://localhost:8787",
  plugins: [
    //passkeyClient()
    lastLoginMethodClient()
  ]
})