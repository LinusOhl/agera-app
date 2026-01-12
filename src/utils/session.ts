import { useSession } from "@tanstack/react-start/server";

type SessionData = {
  accessToken: string;
};

export const useAppSession = () => {
  return useSession<SessionData>({
    name: "app-session",
    password: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      // maxAge: 600,
    },
  });
};
