import { FastifyInstance } from 'fastify'

import { createBookRoute } from './controllers/create-book'
import { updateBookRoute } from './controllers/update-book'

export async function routes(app: FastifyInstance) {
  app.register(createBookRoute)
  app.register(updateBookRoute)
}
