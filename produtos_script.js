let categoriaAtual = 'todos';
let dados = {};

function carregarDados(dadosExternos) {
    dados = dadosExternos;
    filtrarProdutos('todos');
}

function exibirResultados(itens) {
    const section = document.getElementById("resultados-pesquisa");
    section.innerHTML = '';

    if (!itens || itens.length === 0) {
        section.innerHTML = '<p class="sem-resultados">Nenhum produto encontrado.</p>';
        return;
    }

    // Cria 3 colunas
    const colunasContainer = document.createElement('div');
    colunasContainer.className = 'produtos-colunas';
    section.appendChild(colunasContainer);

    const colunas = [[], [], []]; // Array para as 3 colunas

    // Distribui os itens pelas colunas
    itens.forEach((produto, index) => {
        colunas[index % 3].push(produto);
    });

    // Cria as colunas no HTML
    colunas.forEach(colunaItens => {
        const coluna = document.createElement('div');
        coluna.className = 'produtos-coluna';
        
        colunaItens.forEach(produto => {
            coluna.innerHTML += `
                <div class="item-resultado">
                    <img src="${produto.img}" alt="${produto.nome}" loading="lazy">
                    <h2>${produto.nome}</h2>
                    <p class="descricao-meta">${produto.descricao}</p>
                    <span class="preco">${produto.preco}</span>
                    <button class="botao-comprar" onclick="adicionarAoCarrinho('${produto.nome}')">Comprar</button>
                </div>
            `;
        });
        
        colunasContainer.appendChild(coluna);
    });
}

function filtrarProdutos(categoria) {
    categoriaAtual = categoria;
    atualizarMenuAtivo();
    
    if (categoria === 'todos') {
        // Junta todos os produtos de todas as categorias
        const todosProdutos = [...dados.plantas, ...dados.ferramentas, ...dados.sementes];
        exibirResultados(todosProdutos);
    } else {
        exibirResultados(dados[categoria]);
    }
}

function pesquisar() {
    const termo = document.getElementById("campo-pesquisa").value.toLowerCase().trim();
    
    let produtos;
    if (categoriaAtual === 'todos') {
        produtos = [...dados.plantas, ...dados.ferramentas, ...dados.sementes];
    } else {
        produtos = dados[categoriaAtual];
    }

    if (!termo) {
        exibirResultados(produtos);
        return;
    }

    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    exibirResultados(resultados);
}

function atualizarMenuAtivo() {
    document.querySelectorAll('.menu-lista a').forEach(link => {
        const categoriaLink = link.getAttribute('onclick').match(/'([^']+)'/)[1];
        link.classList.toggle('menu-ativo', categoriaLink === categoriaAtual);
    });
}

function adicionarAoCarrinho(nomeProduto) {
    alert(`${nomeProduto} adicionado ao carrinho!`);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("campo-pesquisa").addEventListener("keypress", (e) => {
        if (e.key === "Enter") pesquisar();
    });
    
    if (window.dadosProdutos) {
        carregarDados(window.dadosProdutos);
    }
});