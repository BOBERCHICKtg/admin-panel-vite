import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchPostsRequest,
  setCurrentPage,
} from "../store/posts/posts-actions";
import { logout } from "../store/auth/auth-actions";

export default function PostsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error, pagination } = useSelector(
    (state: any) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPostsRequest(pagination.currentPage));
  }, [pagination.currentPage]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading && !posts.length) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Посты</h2>
        <button onClick={handleLogout}>Выйти</button>
      </div>

      <p>Всего: {pagination.totalCount}</p>

      <table
        border={1}
        cellPadding={5}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Код</th>
            <th>Автор</th>
            <th>Теги</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.code}</td>
              <td>{post.authorName}</td>
              <td>{post.tagNames?.join(", ")}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10 }}>
        {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              style={{
                margin: "0 2px",
                fontWeight: page === pagination.currentPage ? "bold" : "normal",
              }}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
