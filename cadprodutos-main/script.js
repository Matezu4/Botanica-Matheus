import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYfj3kbxeJGmhEo_i15tK5LxvvA1BcmS8",
  authDomain: "botanicamatheus.firebaseapp.com",
  projectId: "botanicamatheus",
  storageBucket: "botanicamatheus.appspot.com",
  messagingSenderId: "841350389172",
  appId: "1:841350389172:web:b68c17a0a22062da42e6e1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Elementos do formulário de cadastro
const codigoProduto = document.getElementById('codigo');
const nomeProduto = document.getElementById('produto');
const categoriaProduto = document.getElementById('categoria');
const quantidadeProduto = document.getElementById('quantidade');
const valorProduto = document.getElementById('valor');
const btnCadastrarProduto = document.getElementById('cadastrarProduto');

// Elementos do formulário de busca/atualização
const buscaCodigoProduto = document.getElementById('idProduto');
const editarNomeProduto = document.getElementById('dadoProduto');
const editarCategoriaProduto = document.getElementById('dadoCategoria');
const editarQuantidadeProduto = document.getElementById('dadoQuantidade');
const editarValorProduto = document.getElementById('dadoValor');
const btnBuscarProduto = document.getElementById('buscarProduto');
const btnAtualizarProduto = document.getElementById('atualizarProduto');
const btnExcluirProduto = document.getElementById('deletarProduto');

// Função para cadastrar produto
function cadastrarProduto() {
    if (!codigoProduto.value || !nomeProduto.value) {
        alert('Código e Nome do Produto são obrigatórios!');
        return;
    }

    get(ref(db, 'Produtos/' + codigoProduto.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('Já existe um produto com este código!');
            } else {
                set(ref(db, 'Produtos/' + codigoProduto.value), {
                    codigo: codigoProduto.value,
                    nome: nomeProduto.value,
                    categoria: categoriaProduto.value,
                    quantidade: quantidadeProduto.value,
                    valor: valorProduto.value
                }).then(() => {
                    alert('Produto cadastrado com sucesso!');
                    limparFormulario();
                }).catch((error) => {
                    console.error('Erro ao cadastrar:', error);
                    alert('Erro ao cadastrar produto');
                });
            }
        });
}

// Função para limpar formulário de cadastro
function limparFormulario() {
    codigoProduto.value = '';
    nomeProduto.value = '';
    categoriaProduto.value = '';
    quantidadeProduto.value = '';
    valorProduto.value = '';
}

// Função para buscar produto
function buscarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Digite um código para buscar');
        return;
    }

    get(ref(db, 'Produtos/' + codigo))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const produto = snapshot.val();
                editarNomeProduto.value = produto.nome;
                editarCategoriaProduto.value = produto.categoria || '';
                editarQuantidadeProduto.value = produto.quantidade || '';
                editarValorProduto.value = produto.valor || '';
            } else {
                alert('Produto não encontrado!');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar:', error);
            alert('Erro ao buscar produto');
        });
}

// Função para atualizar produto
function atualizarProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para atualização');
        return;
    }

    update(ref(db, 'Produtos/' + codigo), {
        nome: editarNomeProduto.value,
        categoria: editarCategoriaProduto.value,
        quantidade: editarQuantidadeProduto.value,
        valor: editarValorProduto.value
    }).then(() => {
        alert('Produto atualizado com sucesso!');
    }).catch((error) => {
        console.error('Erro ao atualizar:', error);
        alert('Erro ao atualizar produto');
    });
}

// Função para excluir produto
function excluirProduto() {
    const codigo = buscaCodigoProduto.value;
    
    if (!codigo) {
        alert('Nenhum produto selecionado para exclusão');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este produto?')) {
        remove(ref(db, 'Produtos/' + codigo))
            .then(() => {
                alert('Produto excluído com sucesso!');
                limparBusca();
            })
            .catch((error) => {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir produto');
            });
    }
}

// Função para limpar busca
function limparBusca() {
    buscaCodigoProduto.value = '';
    editarNomeProduto.value = '';
    editarCategoriaProduto.value = '';
    editarQuantidadeProduto.value = '';
    editarValorProduto.value = '';
}

// Event listeners
btnCadastrarProduto.addEventListener('click', cadastrarProduto);
btnBuscarProduto.addEventListener('click', buscarProduto);
btnAtualizarProduto.addEventListener('click', atualizarProduto);
btnExcluirProduto.addEventListener('click', excluirProduto);