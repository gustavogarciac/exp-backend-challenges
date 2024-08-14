import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeGetBooksUseCase } from '@/use-cases/factories/make-get-books-use-case'

export async function getBooksRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/books',
    {
      schema: {
        summary: 'Get books',
        tags: ['books'],
        response: {
          200: z.object({
            books: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                slug: z.string(),
                description: z.string().nullable(),
                publisher: z.string(),
                genre: z.string(),
                pages: z.number().nullable(),
                language: z.enum(['EN', 'ES', 'FR', 'DE', 'IT', 'PT']),
                stock: z.number(),
                rating: z.number(),
                price: z.number(),
                author: z.string(),
                publishedDate: z.date(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const getBooksUseCase = makeGetBooksUseCase()
      const { books } = await getBooksUseCase.execute()

      return reply.status(200).send({
        books,
      })
    },
  )
}
