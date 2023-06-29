# 🚀 From Zero to Production with SvelteKit

GitHub repository for Okupter's SvelteKit workshop: [From Zero to Production with SvelteKit](https://www.okupter.com/events/from-zero-to-production-with-sveltekit).

The workshop was about building a simple course platform using SvelteKit.

This includes user authentication using email and password, and database integration through Planetscale (MySQL).

## Getting Started

To start, clone this repository and install the dependencies:

```bash
pnpm install
```

The duplicate the `.env.example` file, and rename it to `.env`. Then, fill in the environment variables with your own values.

The `DATABASE_URL` is the connection string to your MySQL database. We used [Planetscale](https://planetscale.com/) for this workshop, but you are free to use any MySQL database.

The `JWT_ENCRYPTION_SECRET` is a secret string that will be used to encrypt the JWT tokens.

You can run this command from a Node.js console to generate a random string:

```bash
crypto.randomUUID()
```

## Running the project

To run the project, use the following command:

```bash
pnpm dev
```

This will start the development server on port 5173.
