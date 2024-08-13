import { makeBook } from 'test/factories/make-book-factory'
import { beforeEach, describe, expect, it } from 'vitest'

import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'

import { GetBooksUseCase } from '../get-books-use-case'

let booksRepository: BooksRepository
let sut: GetBooksUseCase

describe('Get Books Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository()
    sut = new GetBooksUseCase(booksRepository)
  })

  it('should list all books', async () => {
    for (let i = 0; i < 10; i++) {
      const data = makeBook()

      await booksRepository.create(data)
    }

    const { books } = await sut.execute()

    expect(books).toHaveLength(10)
  })

  it('should return an empty array if there are no books', async () => {
    const { books } = await sut.execute()

    expect(books).toHaveLength(0)
  })
})
