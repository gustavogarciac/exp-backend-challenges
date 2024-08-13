import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Book } from '@prisma/client'

import { createSlug } from '@/utils/generate-slug'

export function makeBook(id?: string): Book {
  const title = faker.commerce.productName()
  const slug = createSlug(title)

  const book: Book = {
    id: id ?? randomUUID(),
    title,
    slug,
    description: faker.lorem.paragraph(),
    publisher: faker.company.name(),
    author: faker.person.fullName(),
    genre: faker.commerce.department(),
    language: 'EN',
    pages: faker.number.int({ min: 10, max: 1000 }),
    rating: faker.number.float({ min: 1, max: 5 }),
    price: faker.number.float({ min: 10, max: 100 }),
    stock: faker.number.int({ min: 0, max: 100 }),
    publishedDate: faker.date.past(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return book
}
