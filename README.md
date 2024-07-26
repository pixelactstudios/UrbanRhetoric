# Urban Rhetoric

An open source application built using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com), [Auth.js](https://authjs.dev) and [Contentlayer](https://contentlayer.dev/)

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@devtalan](https://twitter.com/dev_talan).
> See the roadmap below.

## About this project

This project as an experiment to see how a modern app (with features like authentication, subscriptions, API routes, static pages for docs ...etc) would work in Next.js 14 and server components.

**This is not a starter template.**

## Note on Performance

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middlewares
- Authentication using **Auth.js**
- ORM using **Prisma**
- UI Components built using **Shadcn UI**
- Documentation and blog using **MDX** and **Contentlayer**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Add MDX support for basic pages~
- [x] ~Build marketing pages~
- [x] ~Subscriptions using Stripe~
- [x] ~Responsive styles~
- [x] Dark mode

## Running Locally

1. Install dependencies using pnpm:

```sh
yarn install
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. Start the development server:

```sh
yarn dev
```

## License

Licensed under the [MIT license](https://github.com/devchaudhary24k/UrbanRhetoric/blob/main/LISENCE.md).
