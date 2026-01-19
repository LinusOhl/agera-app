import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./auth-middleware";

export const getCurrentUserFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return {
      id: context.user.id,
      name: context.user.name,
      image: context.user.image,
    };
  });
