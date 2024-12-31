import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./data/services/get-user-me-loader";

const protectedRoutes = [
    "/dashboard",
    // Add more protected routes here
]

function isProtectedRoute(path: string): boolean {
    return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
    const user = await getUserMeLoader();
    const currentPath = request.nextUrl.pathname;

    console.log("#####MIDDLEWARE######");
    console.log(user);
    console.log(currentPath);
    console.log("#####MIDDLEWARE END######");

    if (isProtectedRoute(currentPath) && user.ok === false) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };