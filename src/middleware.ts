// import { auth } from "@/lib/auth";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

import {
   DEFAULT_LOGIN_REDIRECT,
   apiAuthPrefix,
   authRoutes,
   publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

   if (isApiAuthRoute) {
      return null;
   }

   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
   }

   if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/auth/login", nextUrl));
   }

   return null;
});
//    const { nextUrl } = req;
//    const isLoggedIn = !!req.auth;

//    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//    if (isApiAuthRoute) {
//       return null;
//    }

//    if (isAuthRoute) {
//       if (isLoggedIn) {
//          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//       }
//       return null;
//    }

//    if (!isLoggedIn && !isPublicRoute) {
//       return Response.redirect(new URL("/login", nextUrl));
//    }

//    return null;
// });

// Optionally, don't invoke Middleware on some paths
export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//    console.log(`route : ${request.nextUrl.pathname}`);
//    console.log("middleware running");
// }

// // See "Matching Paths" below to learn more
// export const config = {
//    matcher: ["/login"],
// };
