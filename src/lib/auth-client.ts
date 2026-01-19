import { createAuthClient } from "better-auth/react";
import { BASE_URL_APP_LOCAL } from "../helpers";

export const { useSession, getSession, signIn, signOut, signUp } =
  createAuthClient({
    baseURL: BASE_URL_APP_LOCAL,
  });
