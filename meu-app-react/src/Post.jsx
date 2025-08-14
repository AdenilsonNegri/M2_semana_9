import React from "react";
import "./ListagemPosts.css";

const Post = ({ id, tipo, titulo, descricao, data, capa, onDelete }) => {
  // Formata a data recebida (string no formato DD/MM/AAAA ou ISO)
  let dataFormatada = data;
  const dataObj = new Date(data);
  if (!isNaN(dataObj)) {
    dataFormatada = dataObj.toLocaleDateString("pt-BR");
  }

  return (
    <div className="card-post">
      {capa && (
        <img src={capa} alt={titulo} className="card-imagem" />
      )}

      <div className="card-conteudo">
        {tipo && <span className="categoria">{tipo.toUpperCase()}</span>}
        <h2 className="titulo">{titulo}</h2>
        <p className="descricao">{descricao}</p>

        <div className="card-footer">
          <p className="data">Publicado em: {dataFormatada}</p>
          {onDelete && (
            <button className="excluir" onClick={() => onDelete(id)}>
              Excluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
