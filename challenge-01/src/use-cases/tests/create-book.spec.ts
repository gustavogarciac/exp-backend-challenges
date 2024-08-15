import { makeBook } from 'test/factories/make-book-factory'
import { beforeEach, describe, expect, it } from 'vitest'

import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'
import { CreateBookUseCase } from '@/use-cases/create-book-use-case'

import { BadRequestError } from '../errors/bad-request-error'

let booksRepository: BooksRepository
let sut: CreateBookUseCase

describe('Create Book Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository()
    sut = new CreateBookUseCase(booksRepository)
  })

  it('should create a new book', async () => {
    const data = makeBook()

    const { book } = await sut.execute(data)

    expect(book.id).toEqual(expect.any(String))
  })

  it("should not create a book if it's already registered", async () => {
    const firstBook = makeBook()

    const secondBook = firstBook

    await sut.execute(firstBook)

    await expect(() => sut.execute(secondBook)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
