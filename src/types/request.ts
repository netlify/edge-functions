// eslint-disable-next-line max-classes-per-file
import { getEnvironment } from './environment'
import NFHeaders, { conditionals as conditionalHeaders } from './headers'

const internals = Symbol('Netlify Internals')

class EdgeRequest extends Request {
  [internals]: {
    forwardedHost: string | null
    forwardedProtocol: string | null
    requestID: string | null
    passthrough: string | null
    ip: string | null
  }

  constructor(input: RequestInfo | URL, init?: RequestInit) {
    const requestInfo = input instanceof URL ? input.toString() : input

    super(requestInfo, init)

    this[internals] = {
      forwardedHost: this.headers.get(NFHeaders.ForwardedHost),
      forwardedProtocol: this.headers.get(NFHeaders.ForwardedProtocol),
      passthrough: this.headers.get(NFHeaders.Passthrough),
      requestID: this.headers.get(NFHeaders.RequestID),
      ip: this.headers.get(NFHeaders.IP),
    }
    ;[NFHeaders.ForwardedHost, NFHeaders.ForwardedProtocol, NFHeaders.Functions, NFHeaders.Passthrough].forEach(
      (header) => {
        this.headers.delete(header)
      },
    )
  }
}

interface OriginRequestOptions {
  req: EdgeRequest
  stripConditionalHeaders?: boolean
  url?: URL
}

class OriginRequest extends EdgeRequest {
  // eslint-disable-next-line complexity
  constructor({ req, stripConditionalHeaders = false, url = new URL(req.url) }: OriginRequestOptions) {
    const passthroughHeader = req[internals].passthrough
    const requestIDHeader = req[internals].requestID
    const environment = getEnvironment()

    // When running locally, we allow the client to specify the host and the
    // protocol used for origin requests.
    if (environment === 'local') {
      /* eslint-disable no-param-reassign */
      url.host = req[internals].forwardedHost || url.host
      url.protocol = req[internals].forwardedProtocol ? `${req[internals].forwardedProtocol}:` : url.protocol
      /* eslint-enable no-param-reassign */
    }

    super(new Request(url.toString(), req))

    if (passthroughHeader !== null) {
      this.headers.set(NFHeaders.Passthrough, passthroughHeader)
    }

    if (requestIDHeader !== null) {
      this.headers.set(NFHeaders.RequestID, requestIDHeader)
    }

    if (stripConditionalHeaders) {
      conditionalHeaders.forEach((name: string) => {
        this.headers.delete(name)
      })
    }
  }
}

export { EdgeRequest, OriginRequest }
