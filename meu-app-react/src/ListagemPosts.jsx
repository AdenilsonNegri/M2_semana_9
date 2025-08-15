import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./ListagemPosts.css";

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

  // Contagem por categoria
  const counts = posts.reduce((acc, post) => {
    const tipo = post.tipo?.toLowerCase() || "outros";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const total = posts.length;

  return (
    <div className="lista-posts">
      {/* Painel de contagem */}
      <div className="painel-contagem">
        <p>
          Atualmente, você tem <strong>{total}</strong> posts cadastrados
        </p>
        <ul>
          {Object.entries(counts).map(([tipo, qtd]) => (
            <li key={tipo}>
              <strong>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}:</strong> {qtd}
            </li>
          ))}
        </ul>
      </div>

    {/* Lista de posts */}
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
          post={post} 
          onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ListagemPosts;
