# Booky API - An API for book management. 📚

## A fully functional API where you can Create, Read, Update and Delete books.
This API were developed so that you can have easy access to CRUD operations related to books. You can catalog it and specify lots of characteristics to the books.


## Technologies 👩‍💻

- Node.js
- TypeScript
- Fastify
- Swagger
- Zod
- Fastify Type Provider
- Vitest
- PrismaORM
- PostgreSQL
- Docker
- SonarQube

## Authors

- [@gustavogarciac](https://www.github.com/gustavogarciac)


## Documentation UI 🖥

You can access the full API documentation clicking below:
- [Click here]('http://localhost:3333/docs')

## API Documentation 📖

#### Return all books.

```http
  GET /books
```

#### Post a new book.

```http
  POST /books
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title*`      | `string` | The title of the book. |
| `description`      | `string` | You can add a little description to the book. |
| `publisher*`      | `string` | Official publisher of the book. |
| `pages`      | `int` | How many pages the book contains. |
| `language*`      | `string` | Text language. |
| `stock*`      | `int` | Stock available |
| `rating*`      | `int` | Rating between 0 and 5. |
| `price*`      | `int` | Sales price. |
| `author*`      | `string` | Author of the book |
| `publishedDate*`      | `dateTime` | Date the book went to sales. |

#### Update a book.

```http
  PUT /books/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title*`      | `string` | The title of the book. |
| `description`      | `string` | You can add a little description to the book. |
| `publisher*`      | `string` | Official publisher of the book. |
| `pages`      | `int` | How many pages the book contains. |
| `language*`      | `string` | Text language. |
| `stock*`      | `int` | Stock available |
| `rating*`      | `int` | Rating between 0 and 5. |
| `price*`      | `int` | Sales price. |
| `author*`      | `string` | Author of the book |
| `publishedDate*`      | `dateTime` | Date the book went to sales. |

#### Delete a book.

```http
  DELETE /books/id
```

You can also see details of the documentation via interface clicking [here.]('http://localhost:3333/docs')


## Run Locally

First of all, you must clone the project to your own computer.

```bash
  git clone https://github.com/gustavogarciac/dream-structure.git
```

Get into the project's directory.

```bash
  cd booky-api
```

Install dependencies

```bash
  pnpm install
```

Create a new .env file following .env.example as a sample.

Run docker containers
```bash
  docker compose up -d
```

Run database migrations

```bash
  pnpm run db:migrate
```

Start the server
```bash
  pnpm run dev
```


## Support

If you find any mistake or bug, please contact me via gustavogarciaci1@gmail.com.



>>>>>>> 4eee187 (chore: updated readme.md)
