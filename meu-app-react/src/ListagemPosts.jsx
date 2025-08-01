import React, { useEffect, useState } from "react";
import Post from "./Post";

const ListagemPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id) => {
    const filteredPosts = posts.filter((p) => p.id !== id);
    setPosts(filteredPosts);
    localStorage.setItem("posts", JSON.stringify(filteredPosts));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ListagemPosts;
