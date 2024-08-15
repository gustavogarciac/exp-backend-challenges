import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeDeleteBookUseCase } from '@/use-cases/factories/make-delete-book-use-case'

export async function deleteBookRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/books/:bookId',
    {
      schema: {
        summary: 'Delete a book',
        tags: ['books'],
        params: z.object({
          bookId: z.string().uuid(),
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
      const { bookId } = req.params

      const deleteUseCase = makeDeleteBookUseCase()
      await deleteUseCase.execute({ id: bookId })

      return reply.status(204).send()
    },
  )
}
