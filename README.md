# checkpoint1-FIAP-html

# 🎬 Cabine — Catálogo de Filmes

Aplicação web para montar um catálogo pessoal de filmes. Cada filme adicionado vira um cartaz na "sala de exibição", com título, ano, gênero e classificação por estrelas.

Projeto desenvolvido para o **Checkpoint 1** da disciplina, utilizando apenas HTML, CSS e JavaScript puro (sem frameworks ou bibliotecas externas).

## 🔗 Visualização

- **Preview ao vivo:** [Preview](https://carmo12.github.io/checkpoint1-FIAP-html/)


## ✨ Funcionalidades

- Adicionar um filme informando título, ano e gênero.
- Ano selecionado a partir de uma lista fixa (1950 a 2026).
- Gênero escolhido a partir de uma lista pré-definida (Drama, Comédia, Ação, Ficção Científica, Terror, Romance, Suspense, Animação, Aventura, Documentário).
- Classificação do filme por estrelas (1 a 5).
- Cada filme adicionado aparece como um cartaz gerado automaticamente, com cor e inicial do título.
- Remoção de qualquer filme diretamente pelo cartaz.
- Contador de filmes em cartaz e mensagem com o último filme adicionado.
- Layout responsivo, adaptado para desktop, tablet e celular.

## 🛠️ Tecnologias e conceitos utilizados

**HTML**
- Tags `<h1>`, `<p>`, `<img>`, `<div>`, `<input>`, `<select>`, `<button>`.

**CSS** (arquivo separado: `style.css`)
- `padding`, `margin`, `color`, `background-color`.
- Seletores de classe, id e pseudo-classes (`:hover`, `:focus`).
- Layout com Flexbox e Grid.
- Responsividade com `@media`.

**JavaScript** (arquivo separado: `script.js`)
- Funções para adicionar, remover e renderizar filmes (`adicionarFilme`, `removerFilme`, `renderizarSala`, `atualizarEstatisticas`, `preencherAnos`, `selecionarEstrela`).
- Manipulação do DOM (criação de elementos, eventos de clique e teclado).

## 📁 Estrutura do projeto

```
catalogo-filmes/
├── index.html   → estrutura da página
├── style.css    → estilos e responsividade
├── script.js    → lógica e interatividade
└── README.md    → este arquivo
```

## ▶️ Como rodar localmente

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador (não precisa de servidor).

## 📅 Entrega

- **Checkpoint:** 1
- **Data de entrega:** 02/09/2026
