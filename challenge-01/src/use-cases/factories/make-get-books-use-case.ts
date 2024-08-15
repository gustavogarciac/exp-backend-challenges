import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository'

import { GetBooksUseCase } from '../get-books-use-case'

export function makeGetBooksUseCase() {
  const repository = new PrismaBooksRepository()
  const useCase = new GetBooksUseCase(repository)

  return useCase
}
