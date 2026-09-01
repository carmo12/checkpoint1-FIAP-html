// Armazena os filmes cadastrados
let filmes = [];

// Cores utilizadas nos cartazes dos filmes
const CORES_CARTAZ = [
  "linear-gradient(160deg, #c8102e, #7a0a1d)",
  "linear-gradient(160deg, #4a3b5c, #24172f)",
  "linear-gradient(160deg, #17161a, #000000)",
  "linear-gradient(160deg, #e8b64c, #a97a1f)",
];

// Elementos da página utilizados pelo JavaScript
const cartazesEl = document.getElementById("cartazes");
const contadorEl = document.getElementById("contador");
const ultimoFilmeEl = document.getElementById("ultimo-filme");
const mensagemErroEl = document.getElementById("mensagem-erro");
const inputTitulo = document.getElementById("input-titulo");
const inputAno = document.getElementById("input-ano");
const inputGenero = document.getElementById("input-genero");
const botoesEstrela = document.querySelectorAll(".estrela");

// Armazena a classificação selecionada
let classificacaoAtual = 0;

// Preenche a lista de anos
function preencherAnos() {
  for (let ano = 2026; ano >= 1950; ano--) {
    const opcao = document.createElement("option");
    opcao.value = ano;
    opcao.textContent = ano;
    inputAno.appendChild(opcao);
  }
}

// Seleciona e destaca as estrelas
function selecionarEstrela(valor) {
  classificacaoAtual = valor;

  botoesEstrela.forEach((botao) => {
    const valorBotao = Number(botao.dataset.valor);
    botao.classList.toggle("selecionada", valorBotao <= valor);
  });
}

// Valida os dados e adiciona um novo filme
function adicionarFilme() {
  const titulo = inputTitulo.value.trim();
  const ano = inputAno.value.trim();
  const genero = inputGenero.value;

  // Limpa mensagens de erro anteriores
  mensagemErroEl.textContent = "";

  // Verifica se todos os campos foram preenchidos
  if (titulo === "" || ano === "" || genero === "" || classificacaoAtual === 0) {
    mensagemErroEl.textContent = "Preencha todos os campos e escolha a classificação.";
    return;
  }

  // Verifica se o ano contém apenas números
  if (!/^\d+$/.test(ano)) {
    mensagemErroEl.textContent = "O ano deve conter apenas números.";
    return;
  }

  // Cria o objeto com os dados do filme
  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    ano: ano,
    genero: genero,
    classificacao: classificacaoAtual,

    // Alterna as cores dos cartazes
    cor: CORES_CARTAZ[filmes.length % CORES_CARTAZ.length],
  };

  // Adiciona o filme ao array
  filmes.push(novoFilme);

  // Atualiza a sala e as informações
  renderizarSala();
  atualizarEstatisticas(novoFilme);

  // Limpa os campos após adicionar o filme
  inputTitulo.value = "";
  inputAno.value = "";
  inputGenero.value = "";
  selecionarEstrela(0);

  // Retorna o cursor para o campo título
  inputTitulo.focus();
}

// Remove um filme pelo seu ID
function removerFilme(id) {
  filmes = filmes.filter((filme) => filme.id !== id);

  renderizarSala();
  atualizarEstatisticas();
}

// Exibe todos os filmes cadastrados na sala
function renderizarSala() {
  // Limpa os cartazes atuais
  cartazesEl.innerHTML = "";

  // Exibe mensagem quando não existem filmes
  if (filmes.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "sala-vazia";
    vazio.textContent = "A sala ainda está vazia — anuncie o primeiro filme ao lado.";

    cartazesEl.appendChild(vazio);
    return;
  }

  // Cria um cartaz para cada filme
  filmes.forEach((filme) => {
    const cartaz = document.createElement("div");
    cartaz.className = "cartaz";

    // Cria a parte visual do cartaz
    const arte = document.createElement("div");
    arte.className = "cartaz-arte";
    arte.style.background = filme.cor;

    // Exibe a primeira letra do título
    arte.textContent = filme.titulo.charAt(0).toUpperCase();

    // Botão para remover o filme
    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "cartaz-remover";

    remover.setAttribute(
      "aria-label",
      `Remover ${filme.titulo} da sala`
    );

    remover.textContent = "×";

    remover.addEventListener("click", (evento) => {
      evento.stopPropagation();
      removerFilme(filme.id);
    });

    arte.appendChild(remover);

    // Área com as informações do filme
    const info = document.createElement("div");
    info.className = "cartaz-info";

    // Exibe o título
    const tituloEl = document.createElement("p");
    tituloEl.className = "cartaz-titulo";
    tituloEl.textContent = filme.titulo;

    // Exibe o ano e a classificação
    const metaEl = document.createElement("p");
    metaEl.className = "cartaz-meta";

    const estrelasTexto =
      "★".repeat(filme.classificacao) +
      "☆".repeat(5 - filme.classificacao);

    metaEl.textContent = `${filme.ano} · ${estrelasTexto}`;

    // Exibe o gênero do filme
    const generoEl = document.createElement("span");
    generoEl.className = "cartaz-genero";
    generoEl.textContent = filme.genero;

    // Adiciona as informações ao cartaz
    info.appendChild(tituloEl);
    info.appendChild(metaEl);
    info.appendChild(generoEl);

    cartaz.appendChild(arte);
    cartaz.appendChild(info);

    // Adiciona o cartaz à sala
    cartazesEl.appendChild(cartaz);
  });
}

// Atualiza o número de filmes e a mensagem da sala
function atualizarEstatisticas(ultimoAdicionado) {
  contadorEl.textContent = filmes.length;

  // Mensagem quando não existem filmes
  if (filmes.length === 0) {
    ultimoFilmeEl.textContent =
      "A sala ainda está vazia. Anuncie a primeira sessão.";

  // Mostra o último filme adicionado
  } else if (ultimoAdicionado) {
    ultimoFilmeEl.textContent =
      `Em cartaz agora: "${ultimoAdicionado.titulo}"`;
  }
}

// Evento do botão para adicionar filmes
document
  .getElementById("btn-adicionar")
  .addEventListener("click", adicionarFilme);

// Eventos para selecionar a classificação pelas estrelas
botoesEstrela.forEach((botao) => {
  botao.addEventListener("click", () => {
    selecionarEstrela(Number(botao.dataset.valor));
  });
});

// Permite adicionar o filme pressionando Enter
inputTitulo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    adicionarFilme();
  }
});

// Configuração inicial da página
preencherAnos();
renderizarSala();
