import { FastifyInstance } from 'fastify'

import { createBookRoute } from './controllers/create-book'
import { deleteBookRoute } from './controllers/delete-book'
import { getBooksRoute } from './controllers/get-books'
import { updateBookRoute } from './controllers/update-book'

export async function routes(app: FastifyInstance) {
  app.register(createBookRoute)
  app.register(updateBookRoute)
  app.register(deleteBookRoute)
  app.register(getBooksRoute)
}
