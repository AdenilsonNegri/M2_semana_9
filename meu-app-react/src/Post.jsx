import React from "react";

const Post = ({ post, onDelete }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <img
        src={post.capa}
        alt="Capa"
        className="w-48 h-auto object-cover"
      />

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <span className="text-sm text-blue-600 font-bold uppercase">{post.tipo}</span>
          <h2 className="text-xl font-semibold text-gray-800 mt-1">{post.titulo}</h2>

          {/* Valor (Data) centralizado e em negrito */}
          <p className="text-center font-bold text-gray-700 mt-1">{post.data}</p>

          <p className="text-gray-600 mt-2">{post.descricao}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
