# Online Store Web Build Using Next 14, Typescript & MongoDB

Main purpose of this project as a Back-End functionality for Olshop, including Admin Panel and RESTful API. This project using monolith architecture.

- [Feature List](#feature-list)
- [Installation](#project-installation)
- [Screenshots](#screenshots)
- [Credit](#project-maintenance-by)
- [Readmore & References](#readmore)

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
DATABASE_URL="mongodb://your-unique-username:your-strong-password@localhost:27017/olshop"
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

# Project Maintenance By

[Alian Hakim](https://github.com/alianhakim9)

# Read More & References

- https://console.cloud.google.com/
- https://next-auth.js.org/
- https://www.prisma.io/
- https://redux-toolkit.js.org/usage/usage-with-typescript
- https://ui.shadcn.com/docs
- https://docs.midtrans.com/docs/snap-preparation
