import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

import { CreateBookUseCase } from '../create-book-use-case'

export function makeCreateBookUseCase() {
  const repository = new PrismaBooksRepository()
  const useCase = new CreateBookUseCase(repository)

  return useCase
}
