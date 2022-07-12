import type { Cookies } from "./cookie_store";
import type { FunctionChain } from "./function_chain";
import type { Geo } from "./geo";
import type { Site } from "./site";

interface NextOptions {
  sendConditionalRequest?: boolean;
}

interface Context {
  cookies: Cookies;
  geo: Geo;
  ip: string;
  json: FunctionChain["json"];
  log: ReturnType<FunctionChain["getLogFunction"]>;
  next: (options?: NextOptions) => Promise<Response>;
  rewrite: FunctionChain["rewrite"];
  site: Site;
}

export type { Context, NextOptions };
