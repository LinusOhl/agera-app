import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./utils/session";

export type ResponseType = {
  status: string;
  data: string;
};

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    console.log("user:", user);
    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    const session = await useAppSession();
    await session.update({
      accessToken: user.data,
    });

    throw redirect({ to: "/", from: "/login" });
  });

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const response = await fetch("http://localhost:3001/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();

    if (!user.data) {
      return;
    }

    // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
    const session = await useAppSession();
    await session.update({
      accessToken: user.data,
    });

    // if (!user) {
    //   return null;
    // }

    return user;
  },
);

export const fetchAccessToken = createServerFn({ method: "GET" }).handler(
  async () => {
    const response = await fetch("http://localhost:3001/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.log("error!!");
      return null;
    }

    return (await response.json()) as ResponseType;
  },
);
