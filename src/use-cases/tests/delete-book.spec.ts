import { makeBook } from 'test/factories/make-book-factory'
import { beforeEach, describe, expect, it } from 'vitest'

import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'

import { DeleteBooksUseCase } from '../delete-book-use-case'
import { BadRequestError } from '../errors/bad-request-error'

let booksRepository: BooksRepository
let sut: DeleteBooksUseCase

describe('Delete Book Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository()
    sut = new DeleteBooksUseCase(booksRepository)
  })

  it('should delete a book', async () => {
    const book = makeBook()

    await booksRepository.create(book)

    await sut.execute({ id: book.id })

    const books = await booksRepository.findAll()

    expect(books).toHaveLength(0)
  })

  it('should throw an error if book does not exist', async () => {
    await expect(sut.execute({ id: 'invalid-id' })).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })
})
