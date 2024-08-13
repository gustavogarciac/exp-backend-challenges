import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  BOOKY_DATABASE_URL: z.string(),
  BOOKY_DATABASE_NAME: z.string().default('booky'),
  BOOOKY_DATABASE_USER: z.string(),
  BOOKY_DATABASE_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables: ', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
