import { Book } from '@prisma/client'

import { BooksRepository } from '@/repositories/books-repository'

interface GetBooksUseCaseResponse {
  books: Book[]
}

export class GetBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<GetBooksUseCaseResponse> {
    const books = await this.booksRepository.findAll()

    return { books }
  }
}
