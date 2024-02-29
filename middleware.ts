import { authMiddleware } from "@clerk/nextjs";
import Router from "next/router";
 
export default authMiddleware({
  afterAuth: (user, request) => {
    // Custom logic to execute after authentication
    // This function will be called after a user is authenticated by Clerk

    // Check if the user is accessing the /api/uploadthing route
    if (request.url.startsWith('/api/uploadthing')) {
      // Allow access to the /api/uploadthing route for both signed-in and signed-out users
      // No redirection needed
      return;
    }

    // For other routes, perform default behavior or custom redirection logic as needed
    if (!user) {
      // Redirect users to the login page if they are not authenticated
      Router.push('/login');
    }
  },
  // Routes that can be accessed while signed out
  publicRoutes: ['/anyone-can-visit-this-route'],// /api/uploadthing resolves the error
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/no-auth-in-this-route'],

});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};