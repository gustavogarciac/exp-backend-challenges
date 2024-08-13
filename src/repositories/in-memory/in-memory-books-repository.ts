import { Book, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { BooksRepository } from '../books-repository'

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = []

  async findById(id: string) {
    const book = this.books.find((book) => book.id === id)

    if (!book) return null

    return book
  }

  async findBySlug(slug: string) {
    const book = this.books.find((book) => book.slug === slug)

    if (!book) return null

    return book
  }

  async findAll() {
    return this.books
  }

  async create(data: Prisma.BookCreateInput) {
    const book = {
      id: data.id ?? randomUUID(),
      title: data.title,
      slug: data.slug,
      description: data.description ?? '',
      publisher: data.publisher,
      genre: data.genre,
      pages: data.pages ?? 0,
      language: data.language ?? 'EN',
      stock: data.stock,
      rating: data.rating,
      price: data.price,
      author: data.author,
      publishedDate: new Date(data.publishedDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.books.push(book)
    return book
  }

  async put(data: Book, bookId: string) {
    const bookIndex = this.books.findIndex((book) => book.id === bookId)
    this.books.slice(bookIndex, 1)

    const updatedBook = {
      ...data,
      updatedAt: new Date(),
    }

    this.books.push(updatedBook)
    return updatedBook
  }
}
