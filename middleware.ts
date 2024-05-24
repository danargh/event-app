import { auth } from "@/lib/auth";

export default auth((req) => {
   console.log(`route : ${req.nextUrl.pathname}`);
   console.log("oi");
});

// Optionally, don't invoke Middleware on some paths
export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//    console.log(`route : ${request.nextUrl.pathname}`);
//    console.log("middleware running");
// }

// // See "Matching Paths" below to learn more
// export const config = {
//    matcher: ["/login"],
// };
