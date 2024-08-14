import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeUpdateBookUseCase } from '@/use-cases/factories/make-update-book-use-case'

export async function updateBookRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/books',
    {
      schema: {
        summary: 'Update a book',
        tags: ['books'],
        body: z.object({
          bookId: z.string().uuid(),
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
          publishedDate: z.coerce.date(),
        }),
        response: {
          204: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const data = req.body

      const updateBookUseCase = makeUpdateBookUseCase()
      await updateBookUseCase.execute(data, data.bookId)

      return reply.status(204).send()
    },
  )
}
