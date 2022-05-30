import type { RouteMatch } from "./routeMatching";
import type { ServerRoute } from "./routes";
/**
 * An object of arbitrary for route loaders and actions provided by the
 * server's `getLoadContext()` function.
 */
export declare type AppLoadContext = any;
/**
 * Data for a route that was returned from a `loader()`.
 */
export declare type AppData = any;
export declare function callRouteAction({ loadContext, match, request, }: {
    loadContext: unknown;
    match: RouteMatch<ServerRoute>;
    request: Request;
}): Promise<Response>;
export declare function callRouteLoader({ loadContext, match, request, }: {
    request: Request;
    match: RouteMatch<ServerRoute>;
    loadContext: unknown;
}): Promise<Response>;
export declare function extractData(response: Response): Promise<unknown>;
