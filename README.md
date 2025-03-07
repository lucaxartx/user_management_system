# User Management System

This project is a User Management System built with Node.js, Express, Prisma, and Jest for testing. The project includes API endpoints for managing users and uses Prisma as the ORM for database interactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/user_management_system.git
    cd user_management_system
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up the Prisma Client:

    ```sh
    npx prisma generate
    ```

4. Create a `.env` file at the root of the project and add your database URL:

    ```env
    DATABASE_URL="file:./dev.db"
    ```

5. Run Prisma Migrate to create the database and apply the schema:

    ```sh
    npx prisma migrate dev --name init
    ```

## Usage

1. Start the development server:

    ```sh
    npm run dev
    ```

2. The server will start on `http://localhost:3000`.

## Testing

1. To run the tests, use the following command:

    **Note**: Before running the tests, comment out the `start()` function in `app.ts`.

    ```sh
    npm test
    ```

## Project Structure

```plaintext
user_management_system/
├── src/
│   ├── client.ts
│   ├── controller/
│   │   └── users.ts
│   ├── db/
│   │   └── connect.ts
│   ├── middleware/
│   │   └── validateRequest.ts
│   ├── routes/
│   │   └── users.ts
│   ├── singleton.ts
│   ├── validators/
│   │   └── userValidation.ts
│   └── [app.ts](http://_vscodecontentref_/2)
├── __tests__/
│   └── users.api.test.ts
├── prisma/
│   └── schema.prisma
├── .env
├── [jest.config.ts](http://_vscodecontentref_/3)
├── [package.json](http://_vscodecontentref_/4)
└── [README.md](http://_vscodecontentref_/5)


GET /user/:id - Get a user by ID

Response:

{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}



GET /users/count - Get the count of users

Response
{
  "count": 5
}


GET /users - Get a list of users

Response:
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]


POST /users/:id - Create a new user

Request Body
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
Response:
{
  "id": 2,
  "name": "John Doe",
  "email": "john.doe@example.com"
}

Address Routes
GET /address/:id - Get an address by ID

{
  "address": {
    "id": 1,
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  }
}

POST /address - Create a new address

Request Body:
{
  "street": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zip": "12345"
}

Response:
{
  "id": 1,
  "street": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zip": "12345"
}

Post Routes
GET /post/:id - Get a post by ID

Response:
{
  "post": {
    "id": 1,
    "title": "My First Post",
    "content": "This is the content of my first post."
  }
}

POST /post - Create a new post

Request Body:
{
  "title": "My First Post",
  "content": "This is the content of my first post."
}

Response:
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my first post."
}
