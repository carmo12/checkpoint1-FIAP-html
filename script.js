// ===== Estado da aplicação =====
let filmes = [];

// Paleta usada para colorir o "cartaz" gerado — mesma família de cores do CSS
const CORES_CARTAZ = [
  "linear-gradient(160deg, #c8102e, #7a0a1d)",
  "linear-gradient(160deg, #4a3b5c, #24172f)",
  "linear-gradient(160deg, #17161a, #000000)",
  "linear-gradient(160deg, #e8b64c, #a97a1f)",
];

// Referências dos elementos usados várias vezes
const cartazesEl = document.getElementById("cartazes");
const contadorEl = document.getElementById("contador");
const ultimoFilmeEl = document.getElementById("ultimo-filme");
const mensagemErroEl = document.getElementById("mensagem-erro");
const inputTitulo = document.getElementById("input-titulo");
const inputAno = document.getElementById("input-ano");
const inputGenero = document.getElementById("input-genero");
const botoesEstrela = document.querySelectorAll(".estrela");

// Classificação (1 a 5 estrelas) escolhida no momento
let classificacaoAtual = 0;

// Preenche o campo Ano com uma lista de 1950 até 2026
function preencherAnos() {
  for (let ano = 2026; ano >= 1950; ano--) {
    const opcao = document.createElement("option");
    opcao.value = ano;
    opcao.textContent = ano;
    inputAno.appendChild(opcao);
  }
}

// Pinta as estrelas de acordo com o valor escolhido
function selecionarEstrela(valor) {
  classificacaoAtual = valor;
  botoesEstrela.forEach((botao) => {
    const valorBotao = Number(botao.dataset.valor);
    botao.classList.toggle("selecionada", valorBotao <= valor);
  });
}

// Função principal: lê os campos, valida e adiciona um filme à sala
function adicionarFilme() {
  const titulo = inputTitulo.value.trim();
  const ano = inputAno.value.trim();
  const genero = inputGenero.value;

  mensagemErroEl.textContent = "";

  if (titulo === "" || ano === "" || genero === "" || classificacaoAtual === 0) {
    mensagemErroEl.textContent = "Preencha todos os campos e escolha a classificação.";
    return;
  }

  if (!/^\d+$/.test(ano)) {
    mensagemErroEl.textContent = "O ano deve conter apenas números.";
    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    ano: ano,
    genero: genero,
    classificacao: classificacaoAtual,
    cor: CORES_CARTAZ[filmes.length % CORES_CARTAZ.length],
  };

  filmes.push(novoFilme);

  renderizarSala();
  atualizarEstatisticas(novoFilme);

  inputTitulo.value = "";
  inputAno.value = "";
  inputGenero.value = "";
  selecionarEstrela(0);
  inputTitulo.focus();
}

// Remove um filme da sala pelo id e re-renderiza
function removerFilme(id) {
  filmes = filmes.filter((filme) => filme.id !== id);
  renderizarSala();
  atualizarEstatisticas();
}

// Desenha todos os cartazes na sala a partir do array "filmes"
function renderizarSala() {
  cartazesEl.innerHTML = "";

  if (filmes.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "sala-vazia";
    vazio.textContent = "A sala ainda está vazia — anuncie o primeiro filme ao lado.";
    cartazesEl.appendChild(vazio);
    return;
  }

  filmes.forEach((filme) => {
    const cartaz = document.createElement("div");
    cartaz.className = "cartaz";

    const arte = document.createElement("div");
    arte.className = "cartaz-arte";
    arte.style.background = filme.cor;
    arte.textContent = filme.titulo.charAt(0).toUpperCase();

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "cartaz-remover";
    remover.setAttribute("aria-label", `Remover ${filme.titulo} da sala`);
    remover.textContent = "×";
    remover.addEventListener("click", (evento) => {
      evento.stopPropagation();
      removerFilme(filme.id);
    });
    arte.appendChild(remover);

    const info = document.createElement("div");
    info.className = "cartaz-info";

    const tituloEl = document.createElement("p");
    tituloEl.className = "cartaz-titulo";
    tituloEl.textContent = filme.titulo;

    const metaEl = document.createElement("p");
    metaEl.className = "cartaz-meta";
    const estrelasTexto = "★".repeat(filme.classificacao) + "☆".repeat(5 - filme.classificacao);
    metaEl.textContent = `${filme.ano} · ${estrelasTexto}`;

    const generoEl = document.createElement("span");
    generoEl.className = "cartaz-genero";
    generoEl.textContent = filme.genero;

    info.appendChild(tituloEl);
    info.appendChild(metaEl);
    info.appendChild(generoEl);

    cartaz.appendChild(arte);
    cartaz.appendChild(info);
    cartazesEl.appendChild(cartaz);
  });
}

// Atualiza o contador e a mensagem de status na cabine
function atualizarEstatisticas(ultimoAdicionado) {
  contadorEl.textContent = filmes.length;

  if (filmes.length === 0) {
    ultimoFilmeEl.textContent = "A sala ainda está vazia. Anuncie a primeira sessão.";
  } else if (ultimoAdicionado) {
    ultimoFilmeEl.textContent = `Em cartaz agora: "${ultimoAdicionado.titulo}"`;
  }
}

// ===== Eventos =====
document.getElementById("btn-adicionar").addEventListener("click", adicionarFilme);

// Cada botão de estrela atualiza a classificação escolhida
botoesEstrela.forEach((botao) => {
  botao.addEventListener("click", () => selecionarEstrela(Number(botao.dataset.valor)));
});

// Permite adicionar pressionando Enter no campo de título
inputTitulo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    adicionarFilme();
  }
});

// Estado inicial da sala ao carregar a página
preencherAnos();
renderizarSala();