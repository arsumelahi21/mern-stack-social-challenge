
# Database Schema & Aggregation Pipeline

## Users Collection

```js
{
  _id: ObjectId,       // Unique user ID
  name: String,        // User name
  joined: Date         // Account creation date
}
````

## Follows Collection

```js
{
  follower: ObjectId,  // User who is following
  following: ObjectId  // User being followed
}
```

## Posts Collection

```js
{
  _id: ObjectId,       // Unique post ID
  author: ObjectId,    // User ID of post author
  content: String,     // Post text
  created: Date        // Post creation time
}
```

---

## Aggregation Pipeline

Returns the 10 most recent posts from a user's followings, sorted newest to oldest, with each post's content, creation time, and author's name:

```js
db.follows.aggregate([
  { $match: { follower: ObjectId("u1") } }, // Find who user follows
  { $lookup: {
      from: "posts",
      localField: "following",
      foreignField: "author",
      as: "posts"
  }},
  { $unwind: "$posts" }, // Flatten posts array
  { $lookup: {
      from: "users",
      localField: "posts.author",
      foreignField: "_id",
      as: "author"
  }},
  { $unwind: "$author" }, // Flatten author array
  { $project: {
      _id: 0,
      content: "$posts.content",
      created: "$posts.created",
      author: "$author.name"
  }},
  { $sort: { created: -1 } }, // Newest first
  { $limit: 10 }
])
```

**Explanation:**
Get everyone the user follows, fetch their posts, join author info, then sort and limit.

---

## Indexing for Maximum Read Performance

* Add an index on `{ follower: 1 }` to the `follows` collection to quickly list who a user follows.
* On the `posts` collection, create a compound index on `{ author: 1, created: -1 }` to efficiently fetch recent posts for each author in reverse-chronological order.
* The `users` collection relies on the default `_id` index for fast lookups by user ID.

