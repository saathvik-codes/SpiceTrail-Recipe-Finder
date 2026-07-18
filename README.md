# SpiceTrail — Recipe Finder

Full-stack recipe search app. Search recipes via TheMealDB, view full
ingredients/instructions, and save favorites to your account.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB (Mongoose)
- **Auth**: JWT, bcrypt password hashing
- **Recipe data**: [TheMealDB](https://www.themealdb.com/api.php) public API

## Structure

```
spicetrail/
  backend/   Express API — auth + favorites, MongoDB-backed
  frontend/  Next.js app — search, recipe detail, favorites
```

## Run locally

### Backend

```
cd backend
cp .env.example .env   # set MONGODB_URI / JWT_SECRET
npm install
npm run dev             # http://localhost:4000
```

### Frontend

```
cd frontend
cp .env.local.example .env.local
npm install
npm run dev              # http://localhost:3000
```

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/auth/register | – | Create account |
| POST | /api/v1/auth/login | – | Log in |
| GET | /api/v1/favorites | JWT | List saved recipes |
| POST | /api/v1/favorites | JWT | Save a recipe |
| DELETE | /api/v1/favorites/:mealId | JWT | Remove a saved recipe |
