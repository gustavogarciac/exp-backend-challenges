import { makeBook } from 'test/factories/make-book-factory'
import { beforeEach, describe, expect, it } from 'vitest'

import { BooksRepository } from '@/repositories/books-repository'
import { InMemoryBooksRepository } from '@/repositories/in-memory/in-memory-books-repository'

import { BadRequestError } from '../errors/bad-request-error'
import { UpdateBookUseCase } from '../update-book-use-case'

let booksRepository: BooksRepository
let sut: UpdateBookUseCase

describe('Update Book Use Case', () => {
  beforeEach(() => {
    booksRepository = new InMemoryBooksRepository()
    sut = new UpdateBookUseCase(booksRepository)
  })

  it('should update a book', async () => {
    const book = makeBook()

    await booksRepository.create(book)

    const updatedBook = await sut.execute(
      {
        title: 'Updated Title',
        slug: 'updated-title',
        description: 'Updated Description',
        publisher: 'Updated Publisher',
      },
      book.id,
    )

    const books = await booksRepository.findAll()

    expect(books[0].title).toBe('Updated Title')
    expect(books[0].title).not.toBe(book.title)
    expect(updatedBook.book.title).toBe('Updated Title')
  })

  it('should throw an error if book not found', async () => {
    await expect(
      sut.execute(
        {
          title: 'Updated Title',
          slug: 'updated-title',
          description: 'Updated Description',
          publisher: 'Updated Publisher',
        },
        'non-existing-id',
      ),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
