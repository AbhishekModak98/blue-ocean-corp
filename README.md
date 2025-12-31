## NestJS Course Management Backend

### Tech Stack

- NestJS
- MongoDB (Mongoose)

### Modules

- Category
- SubCategory
- Course

### Features

- CRUD APIs
- Pagination, sorting, search
- Soft delete
- MongoDB aggregation
- Transaction for Course creation
  - Because my system has stand alone mongoDB connection, transactions are not supported
  - Tried fixing those connections but was taking longer than expected

### Setup

1. npm install
2. npm run start:dev

Note: MongoDB connection is directly configured in app.module.ts for easy evaluation.
