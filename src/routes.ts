/*
   an array of routes that are accessible to the public
   These routes do not require authentication
   @type {string[]}
*/
export const publicRoutes = ["/"];

/*
   an array of routes that use for authentication
   These routes will redirect to the login page if the user is not authenticated
   @type {string[]}
*/
export const authRoutes = ["/auth/login", "/auth/register"];

/*
   The prefix for API authentication routes
   Routes that start with this prefix are used for API
   @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/*
   The default redirect path after a successful login
   @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
