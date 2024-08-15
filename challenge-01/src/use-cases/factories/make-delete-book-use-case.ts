import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

import { DeleteBooksUseCase } from '../delete-book-use-case'

export function makeDeleteBookUseCase() {
  const repository = new PrismaBooksRepository()
  const useCase = new DeleteBooksUseCase(repository)

  return useCase
}
