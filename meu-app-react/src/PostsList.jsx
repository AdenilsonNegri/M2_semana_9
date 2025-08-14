import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./ListagemPosts.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Busca os posts do localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id) => {
    const filteredPosts = posts.filter((p) => p.id !== id);
    setPosts(filteredPosts);
    localStorage.setItem("posts", JSON.stringify(filteredPosts));
  };

  return (
    <div className="lista-posts">
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum post encontrado.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            tipo={post.tipo}
            titulo={post.titulo}
            descricao={post.descricao}
            data={post.data}
            capa={post.capa}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default PostsList;
