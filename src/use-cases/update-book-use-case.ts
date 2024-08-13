import { Book, Language } from '@prisma/client'

import { BooksRepository } from '@/repositories/books-repository'

import { BadRequestError } from './errors/bad-request-error'

interface UpdateBookUseCaseRequest {
  title?: string
  slug?: string
  description?: string | null
  publisher?: string
  genre?: string
  pages?: number | null
  language?: Language
  stock?: number
  rating?: number
  price?: number
  author?: string
  publishedDate?: Date | string
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface UpdateBookUseCaseResponse {
  book: Book
}

export class UpdateBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(
    data: UpdateBookUseCaseRequest,
    bookId: string,
  ): Promise<UpdateBookUseCaseResponse> {
    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      throw new BadRequestError('Book not found')
    }

    book.author = data.author ?? book.author
    book.createdAt = data.createdAt ? new Date(data.createdAt) : book.createdAt
    book.description = data.description ?? book.description
    book.genre = data.genre ?? book.genre
    book.language = data.language ?? book.language
    book.pages = data.pages ?? book.pages
    book.price = data.price ?? book.price
    book.publishedDate = data.publishedDate
      ? new Date(data.publishedDate)
      : book.publishedDate
    book.publisher = data.publisher ?? book.publisher
    book.rating = data.rating ?? book.rating
    book.slug = data.slug ?? book.slug
    book.stock = data.stock ?? book.stock
    book.title = data.title ?? book.title

    const updatedBook = await this.booksRepository.put(book, bookId)

    return { book: updatedBook }
  }
}
