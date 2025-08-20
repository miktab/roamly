# Authentication Setup

This project uses NextAuth.js with Prisma and MongoDB for authentication.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MDB_URI="your-mongodb-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

## Database Setup

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npm run db:generate
```

3. Push the schema to your database:
```bash
npm run db:push
```

4. (Optional) Open Prisma Studio to view your data:
```bash
npm run db:studio
```

## Authentication Features

- **Credential-based authentication** using email and password
- **User registration** with password hashing (bcrypt)
- **Protected routes** using NextAuth middleware
- **Session management** with JWT tokens
- **MongoDB integration** with Prisma ORM

## Routes

- `/auth/signin` - Sign in page
- `/auth/signup` - User registration page
- `/dashboard` - Protected dashboard (requires authentication)
- `/api/auth/[...nextauth]` - NextAuth API routes
- `/api/auth/register` - User registration API

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/auth/signup` to create a new account
3. Sign in at `/auth/signin`
4. Access the protected dashboard at `/dashboard`

## Database Models

The Prisma schema includes:
- `User` - User accounts with email/password auth
- `Account` - OAuth account linking (for future providers)
- `Session` - User sessions
- `customer` - Customer data for events
- `checkout` - Purchase/checkout information
- `visitor` - Analytics tracking
