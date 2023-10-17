### Banking API

An internal API for a fake financial institution using Node and Express.

### API Features

-   Create a new bank account for a customer, with an initial deposit amount. A
    single customer may have multiple bank accounts.
-   Retrieve a customer's information
-   Transfer amounts between any two accounts, including those owned by
    different customers.
-   Retrieve balances for a given account.
-   Deposit and withdraw
-   Retrieve transfer history for a given account.

### Commands

-   npm start: starts the node server
-   npx prisma studio: opens the prisma DB in localhost
-   npx prisma db seed: populates prisma DB with seed data

### Docs

After starting the server, go to http://localhost:3000/api-docs/ to view the API docs

### Technologies

-   [Typescript](https://www.typescriptlang.org/docs/)
-   [Express](https://expressjs.com/en/guide/routing.html)
-   [Prisma](https://www.prisma.io/docs)
-   [Prisma Studio](https://www.prisma.io/studio)
-   [Node](https://nodejs.org/en)
-   [Swagger](https://swagger.io/)
-   [Jest](https://jestjs.io/)
