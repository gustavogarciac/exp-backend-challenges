import { Book, Language } from '@prisma/client'

import { BooksRepository } from '@/repositories/books-repository'
import { createSlug } from '@/utils/generate-slug'

import { BadRequestError } from './errors/bad-request-error'

interface CreateBookUseCaseParams {
  title: string
  description: string | null
  publisher: string
  genre: string
  pages: number | null
  language: Language
  stock: number
  rating: number
  price: number
  author: string
  publishedDate: Date | string
}

interface CreateBookUseCaseResponse {
  book: Book
}

export class CreateBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(
    data: CreateBookUseCaseParams,
  ): Promise<CreateBookUseCaseResponse> {
    const slug = createSlug(data.title)

    const bookAlreadyExists = await this.booksRepository.findBySlug(slug)

    if (bookAlreadyExists) {
      throw new BadRequestError('Book already exists')
    }

    const {
      title,
      description,
      publisher,
      genre,
      pages,
      language,
      stock,
      rating,
      price,
      author,
      publishedDate,
    } = data

    const book = await this.booksRepository.create({
      title,
      slug,
      description,
      publisher,
      genre,
      pages,
      language,
      stock,
      rating,
      price,
      author,
      publishedDate,
    })

    return { book }
  }
}
