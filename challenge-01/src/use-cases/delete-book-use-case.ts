import { BooksRepository } from '@/repositories/books-repository'

import { BadRequestError } from './errors/bad-request-error'

interface DeleteBooksUseCaseRequest {
  id: string
}

export class DeleteBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({ id }: DeleteBooksUseCaseRequest) {
    const book = await this.booksRepository.findById(id)

    if (!book) throw new BadRequestError('Book not found')

    await this.booksRepository.delete(book.id)
  }
}
