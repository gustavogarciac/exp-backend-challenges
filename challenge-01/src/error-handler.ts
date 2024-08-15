import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './use-cases/errors/bad-request-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = async (
  error,
  request,
  reply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  console.error(error)
  return reply.status(500).send({
    message: 'Internal Server Error',
  })
}
