import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from '../deno_std_lib/http/cookie/cookie';

interface DeleteCookieOptions {
  domain?: string;
  name: string;
  path?: string;
}

interface DeleteCookieOp {
  options: DeleteCookieOptions;
  type: "delete";
}

interface SetCookieOp {
  cookie: Cookie;
  type: "set";
}

class CookieStore {
  ops: (DeleteCookieOp | SetCookieOp)[];
  request: Request;

  constructor(request: Request) {
    this.ops = [];
    this.request = request;
  }

  apply(response: Response) {
    this.ops.forEach((op) => {
      switch (op.type) {
        case "delete":
          deleteCookie(response.headers, op.options.name, {
            domain: op.options.domain,
            path: op.options.path,
          });

          break;

        case "set":
          setCookie(response.headers, op.cookie);

          break;
        default:
          break;
      }
    });
  }

  delete(input: string | DeleteCookieOptions) {
    const defaultOptions = {
      path: "/",
    };
    const options = typeof input === "string" ? { name: input } : input;

    this.ops.push({
      options: { ...defaultOptions, ...options },
      type: "delete",
    });
  }

  get(name: string) {
    return getCookies(this.request.headers)[name];
  }

  // eslint-disable-next-line no-use-before-define
  getPublicInterface(): Cookies {
    return {
      delete: this.delete.bind(this),
      get: this.get.bind(this),
      set: this.set.bind(this),
    };
  }

  set(cookie: Cookie) {
    this.ops.push({ cookie, type: "set" });
  }
}

interface Cookies {
  delete: CookieStore["delete"];
  get: CookieStore["get"];
  set: CookieStore["set"];
}
export { CookieStore };
export type { Cookies };
