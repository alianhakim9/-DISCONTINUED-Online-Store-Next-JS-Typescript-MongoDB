# Online Store Website Next 14, Typescript & MongoDB

Main purpose of this project as a Back-End functionality for Olshop, including Admin Panel and RESTful API. This project using monolith architecture.

- [Feature List](#feature-list)
- [Installation](#project-installation)
- [Screenshots](#screenshots)
- [Credit](#project-maintenance-by)
- [Refernces](#references)

---

# Feature List :

- Authentication & Authorization
  - Credentials Auth
  - OAuth2 (Sign In With Google)
- Admin Panel
  - Product, Category, Order Management
  - File/Image Upload
- Front-End / Client Side
  - Shopping Cart
- Filtering, Sorting & Pagination
- Payment Gateway (Midtrans)
- Responsive Web (Development)

# Project Installation

The following is how to install the project from start to finish

### Installing Library & Dependencies

First, run

`npm install OR yarn install`

### Docker & Database setup

```
docker-compose up -d
```

Database setup

```
> docker exec -it <container_id> bash
> mongo
> use olshop
> db.createUser({
  user: "your-unique-username",
  pwd: "your-strong-password",
  roles: ["readWrite", "dbAdmin"]
});
```

Setup ENV

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_AUTH_SECRET=
NEXT_AUTH_URL=http://localhost:3000
DATABASE_URL="mongodb://user:olshoppassword@localhost:27017/olshop-db"
# Midtrans
MIDTRANS_MERCHANT_ID=
MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
```

Prisma setup

```
npx prisma db push
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Screenshots
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/34bd9180-3631-4283-952e-cceab10c3103">  Sign In Page |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/83cfe406-a0e5-43f7-8e73-b842a33b602b"> Sign Up Page | <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/a4135726-a5c8-4274-a2c7-76c16ff24aa9"> Footer Style |
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/9e08efc5-7baa-4a5b-937f-9a5c26a8d878"> Product Detail Page | <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/ddb45036-86c9-4216-9a1d-0f523abe47f9"> Shopping Cart Page | <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://github.com/alianhakim9/Online-Store-Next-JS-Typescript-MongoDB/assets/51102459/d767ff66-eadf-4b66-90d1-802a100b668f"> Payment Page |
|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">  |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">|<img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://user-images.githubusercontent.com/297678/29892310-03e92256-8d83-11e7-9b58-986dcb6f702e.png">|

# Project Maintenance By

[Alian Hakim](https://github.com/alianhakim9)

# References

- https://console.cloud.google.com/
- https://next-auth.js.org/
- https://www.prisma.io/
- https://redux-toolkit.js.org/usage/usage-with-typescript
- https://ui.shadcn.com/docs
- https://docs.midtrans.com/docs/snap-preparation
