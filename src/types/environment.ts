import { Deno } from '@deno/shim-deno'

export const getEnvironment = () => (Deno.env.get('DENO_DEPLOYMENT_ID') ? 'production' : 'local')
