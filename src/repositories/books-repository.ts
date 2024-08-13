import { Book, Prisma } from '@prisma/client'

export interface BooksRepository {
  create(data: Prisma.BookCreateInput): Promise<Book>
  findById(id: string): Promise<Book | null>
  findBySlug(slug: string): Promise<Book | null>
  findAll(): Promise<Book[]>
  put(data: Book, bookId: string): Promise<Book>
  delete(id: string): Promise<void>
}
