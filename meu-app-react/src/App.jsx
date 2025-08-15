import React, { useEffect, useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [categoria, setCategoria] = useState("");

  const [totalPosts, setTotalPosts] = useState(0);
  const [contagemCategorias, setContagemCategorias] = useState({});

  // Carregar total de posts do localStorage ao iniciar
  useEffect(() => {
    const postsSalvos = JSON.parse(localStorage.getItem("posts") || "[]");
    setTotalPosts(postsSalvos.length);

    const categorias = postsSalvos.reduce((acc, post) => {
      const tipo = post.tipo?.toLowerCase() || "outros";
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {});
    setContagemCategorias(categorias);
  }, []);

  const validarFormulario = () => {
    if (!titulo.trim()) {
      toast.error("Título é obrigatório.");
      return false;
    }

    if (!descricao.trim()) {
      toast.error("Descrição é obrigatória.");
      return false;
    }

    if (!imagemUrl.startsWith("http")) {
      toast.error("A URL da imagem deve começar com 'http'.");
      return false;
    }

    if (!categoria) {
      toast.error("Selecione uma categoria.");
      return false;
    }

    if (!dataPublicacao) {
      toast.error("Data de publicação é obrigatória.");
      return false;
    }

    const dataAtual = new Date().toISOString().split("T")[0];
    if (dataPublicacao < dataAtual) {
      toast.error("A data de publicação deve ser hoje ou futura.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const novoPost = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 8), // id único
    tipo: categoria,
    titulo,
    descricao,
    capa: imagemUrl,
    data: dataPublicacao,
  };

    const postsAtuais = JSON.parse(localStorage.getItem("posts") || "[]");
    const postsAtualizados = [...postsAtuais, novoPost];
    localStorage.setItem("posts", JSON.stringify(postsAtualizados));
    setTotalPosts(postsAtualizados.length);

    const categorias = postsAtualizados.reduce((acc, post) => {
      const tipo = post.tipo?.toLowerCase() || "outros";
      acc[tipo] = (acc[tipo] || 0) + 1;
      return acc;
    }, {});
    setContagemCategorias(categorias);

    toast.success("Post salvo com sucesso!");

    // Limpa os campos
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setDataPublicacao("");
    setCategoria("");
  };

  return (
    <div className="container">
      <h1>Painel de Gerenciamento</h1>

      <p className="total-posts">
        Atualmente, você tem <b>{totalPosts}</b> posts cadastrados
      </p>
      <div className="contagem-categorias">
        {Object.keys(contagemCategorias).map((categoria) => (
          <p key={categoria}>
            <b>{categoria}:</b> <b>{contagemCategorias[categoria]}</b>
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="formulario">
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        <label htmlFor="imagemUrl">URL da imagem de capa</label>
        <input
          type="text"
          id="imagemUrl"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          
          placeholder="https://exemplo.com"
        />

        <label htmlFor="dataPublicacao">Data de publicação</label>
        <input
          type="date"
          id="dataPublicacao"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
        />

        <label htmlFor="categoria">Tipo do post</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="Artigo">Artigo</option>
          <option value="Notícia">Notícia</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Entrevista">Entrevista</option>
        </select>

        <button type="submit">Publicar</button>
      </form>

      
      <ToastContainer />
    </div>
  );
}

export default App;
