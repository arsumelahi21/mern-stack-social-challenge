import { useRef, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useApi } from "./hooks/useApi";

const PAGE_SIZE = 10;

export default function Feed() {
  const { setToken } = useAuth();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const resource = `http://localhost:3001/posts?page=${page}&pageSize=${PAGE_SIZE}`;
  const { data, loading, error } = useApi(resource);

  useEffect(() => {
    if (data && Array.isArray(data.posts)) {
      setItems(prev =>
        page === 1 ? data.posts : [...prev, ...data.posts]
      );
      setHasMore(data.posts.length === PAGE_SIZE);
    }
  }, [data, page]);

  const loaderRef = useRef();
  const handleScroll = useCallback(() => {
    if (
      loaderRef.current &&
      loaderRef.current.getBoundingClientRect().top < window.innerHeight &&
      hasMore && !loading
    ) {
      setPage(p => p + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="feed-bg">
      <div className="feed-header">
        <h2>Feed</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="feed-container">
        {items.length === 0 && !loading && (
          <div className="feed-center-message">No posts found.</div>
        )}
        {items.map(post => (
          <div className="feed-card" key={post.id}>
            <div className="feed-author">
              <span className="author-avatar">
                {post.author?.[0]?.toUpperCase() || "?"}
              </span>
              <span className="author-name">{post.author}</span>
            </div>
            <div className="feed-content">{post.content}</div>
          </div>
        ))}
        <div ref={loaderRef} />
      </div>
      {loading && <p className="feed-info">Loading...</p>}
      {error && <div className="feed-error">{error.message}</div>}
      {!hasMore && items.length > 0 && (
        <div className="feed-center-message">No more posts.</div>
      )}
    </div>
  );
}
