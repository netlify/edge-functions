import type { Context } from "./context";

interface EdgeFunction {
  (request: Request, context: Context): Response | Promise<Response> | void;
}

export type { EdgeFunction };
