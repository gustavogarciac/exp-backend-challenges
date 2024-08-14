import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

import { UpdateBookUseCase } from '../update-book-use-case'

export function makeUpdateBookUseCase() {
  const repository = new PrismaBooksRepository()
  const useCase = new UpdateBookUseCase(repository)

  return useCase
}
