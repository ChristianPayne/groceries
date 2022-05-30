export declare type JsonFunction = <Data>(data: Data, init?: number | ResponseInit) => Response;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @see https://remix.run/api/remix#json
 */
export declare const json: JsonFunction;
export declare type RedirectFunction = (url: string, init?: number | ResponseInit) => Response;
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 *
 * @see https://remix.run/api/remix#redirect
 */
export declare const redirect: RedirectFunction;
export declare function isResponse(value: any): value is Response;
export declare function isRedirectResponse(response: Response): boolean;
export declare function isCatchResponse(response: Response): boolean;
