
# MERN Social Network Code Challenge

## Project Overview

This is a MERN-stack (MongoDB, Express, React, Node.js) mini social network featuring:
- User authentication (JWT, role-based access control)
- API endpoints with protected actions
- React front-end with custom data-fetching hook and infinite scroll
- Clean code and test coverage

---

## Folder Structure

```

/db      # Database schema & data modeling notes
/api     # Express backend (API, middleware, tests)
/web     # React front-end (SPA, custom hooks)
/debug   # Debugging/code review answers

````

---

## Part 1: Database Schema & Indexing (Also Detail Available at db/schema.md with aggregation Pipeline)

**users collection**
```js
{
  _id: ObjectId,      // Unique user ID
  name: String,       // User's name
  joined: Date        // Account creation date
}
````

**follows collection**

```js
{
  follower: ObjectId, // User who is following
  following: ObjectId // User being followed
}
```

**posts collection**

```js
{
  _id: ObjectId,      // Unique post ID
  author: ObjectId,   // User ID of post author
  content: String,    // Post text
  created: Date       // Post creation time
}
```

**Indexes for Maximum Performance**

* `follows`: `{ follower: 1 }` — Quickly find who a user follows.
* `posts`: `{ author: 1, created: -1 }` — Efficiently fetch recent posts for each author in reverse-chronological order.
* `users`: Default `_id` index suffices for user lookups.

---

## How to Run the API

1. **Install dependencies**

   ```bash
   cd api
   npm install
   ```

2. **Create a `.env` file** in `/api`:

   ```
   JWT_SECRET=yourSecretKey
   PORT=3001
   ```

3. **Start the server**

   ```bash
   npm start
   ```

   The server runs by default on [http://localhost:3001](http://localhost:3001).

4. **Run tests**

   ```bash
   npm test
   ```

---

## How to Run the React UI

1. **Install dependencies**

   ```bash
   cd web
   npm install
   ```

2. **Start the front-end**

   ```bash
   npm run dev
   ```

   The app runs by default on [http://localhost:5173](http://localhost:5173).


## Credentials for Testing

* `u1` — regular user
* `u2` — admin

Use these IDs when logging in.

---

## Test Commands

```bash
cd api
npm test
```

---

## Additional Notes

* Full backend and frontend source are in `/api` and `/web` folders.
* Debugging/code review answers are in `/debug/explanation.txt`.
* For testing and demo purposes, I created the `/posts/` endpoint to list posts with fake data.
---
