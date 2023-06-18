import { authMiddleware } from "@clerk/nextjs";
const publicRoutes = ["/", "/blog", "/api/webhooks/user"];
export default authMiddleware({
  publicRoutes,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
