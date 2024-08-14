import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeCreateBookUseCase } from '@/use-cases/factories/make-create-book-use-case'

export async function createBookRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/books',
    {
      schema: {
        summary: 'Create a new book',
        tags: ['books'],
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
          publisher: z.string(),
          genre: z.string(),
          pages: z.number().nullable(),
          language: z.enum(['EN', 'ES', 'FR', 'DE', 'IT', 'PT']),
          stock: z.number(),
          rating: z.number(),
          price: z.number(),
          author: z.string(),
          publishedDate: z.string(),
        }),
        response: {
          201: z.object({
            bookId: z.string().uuid(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const data = req.body

      const createBookUseCase = makeCreateBookUseCase()
      const { book } = await createBookUseCase.execute(data)

      return reply.status(201).send({ bookId: book.id })
    },
  )
}
