import { FastifyInstance } from 'fastify'

import { createBookRoute } from './controllers/create-book'

export async function routes(app: FastifyInstance) {
  app.register(createBookRoute)
}
