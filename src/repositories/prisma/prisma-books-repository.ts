import { Book, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { BooksRepository } from '../books-repository'

export class PrismaBooksRepository implements BooksRepository {
  async findById(id: string) {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })

    if (!book) return null

    return book
  }

  async findBySlug(slug: string) {
    const book = await prisma.book.findUnique({
      where: {
        slug,
      },
    })

    if (!book) return null

    return book
  }

  async findAll() {
    const books = await prisma.book.findMany()

    return books
  }

  async create(data: Prisma.BookCreateInput) {
    const book = await prisma.book.create({
      data,
    })

    return book
  }

  async delete(id: string) {
    await prisma.book.delete({
      where: {
        id,
      },
    })
  }

  async put(data: Book, bookId: string) {
    const book = await prisma.book.update({
      data,
      where: {
        id: bookId,
      },
    })

    return book
  }
}
