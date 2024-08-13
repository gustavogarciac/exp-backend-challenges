import { Book, Prisma } from '@prisma/client'

export interface BooksRepository {
  create(data: Prisma.BookCreateInput): Promise<Book>
  findById(id: string): Promise<Book | null>
  findBySlug(slug: string): Promise<Book | null>
}
