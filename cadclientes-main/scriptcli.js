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
const cpfCliente = document.getElementById('cpfCliente');
const nomeCliente = document.getElementById('nomeCliente');
const emailCliente = document.getElementById('emailCliente');
const telefoneCliente = document.getElementById('telefoneCliente');
const enderecoCliente = document.getElementById('enderecoCliente');
const cidadeCliente = document.getElementById('cidadeCliente');
const estadoCliente = document.getElementById('estadoCliente');
const btnCadastrarCliente = document.getElementById('cadastrarCliente');

// Elementos do formulário de gerenciamento
const buscaCpfCliente = document.getElementById('buscaCpfCliente');
const editarNomeCliente = document.getElementById('editarNomeCliente');
const editarEmailCliente = document.getElementById('editarEmailCliente');
const editarTelefoneCliente = document.getElementById('editarTelefoneCliente');
const editarEnderecoCliente = document.getElementById('editarEnderecoCliente');
const editarCidadeCliente = document.getElementById('editarCidadeCliente');
const editarEstadoCliente = document.getElementById('editarEstadoCliente');
const btnBuscarCliente = document.getElementById('buscarCliente');
const btnAtualizarCliente = document.getElementById('atualizarCliente');
const btnExcluirCliente = document.getElementById('excluirCliente');

// Função para cadastrar cliente
function cadastrarCliente() {
    if (!cpfCliente.value || !nomeCliente.value) {
        alert('CPF e Nome são obrigatórios!');
        return;
    }

    get(ref(db, 'Clientes/' + cpfCliente.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('Já existe um cliente com este CPF!');
            } else {
                set(ref(db, 'Clientes/' + cpfCliente.value), {
                    cpf: cpfCliente.value,
                    nome: nomeCliente.value,
                    email: emailCliente.value,
                    telefone: telefoneCliente.value,
                    endereco: enderecoCliente.value,
                    cidade: cidadeCliente.value,
                    estado: estadoCliente.value
                }).then(() => {
                    alert('Cliente cadastrado com sucesso!');
                    limparFormularioCadastro();
                }).catch((error) => {
                    console.error('Erro ao cadastrar:', error);
                    alert('Erro ao cadastrar cliente');
                });
            }
        });
}

// Função para buscar cliente
function buscarCliente() {
    const cpf = buscaCpfCliente.value;
    
    if (!cpf) {
        alert('Digite um CPF para buscar');
        return;
    }

    get(ref(db, 'Clientes/' + cpf))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const cliente = snapshot.val();
                editarNomeCliente.value = cliente.nome;
                editarEmailCliente.value = cliente.email || '';
                editarTelefoneCliente.value = cliente.telefone || '';
                editarEnderecoCliente.value = cliente.endereco || '';
                editarCidadeCliente.value = cliente.cidade || '';
                editarEstadoCliente.value = cliente.estado || '';
            } else {
                alert('Cliente não encontrado!');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar:', error);
            alert('Erro ao buscar cliente');
        });
}

// Função para atualizar cliente
function atualizarCliente() {
    const cpf = buscaCpfCliente.value;
    
    if (!cpf) {
        alert('Nenhum cliente selecionado para atualização');
        return;
    }

    update(ref(db, 'Clientes/' + cpf), {
        nome: editarNomeCliente.value,
        email: editarEmailCliente.value,
        telefone: editarTelefoneCliente.value,
        endereco: editarEnderecoCliente.value,
        cidade: editarCidadeCliente.value,
        estado: editarEstadoCliente.value
    }).then(() => {
        alert('Cliente atualizado com sucesso!');
    }).catch((error) => {
        console.error('Erro ao atualizar:', error);
        alert('Erro ao atualizar cliente');
    });
}

// Função para excluir cliente
function excluirCliente() {
    const cpf = buscaCpfCliente.value;
    
    if (!cpf) {
        alert('Nenhum cliente selecionado para exclusão');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        remove(ref(db, 'Clientes/' + cpf))
            .then(() => {
                alert('Cliente excluído com sucesso!');
                limparBusca();
            })
            .catch((error) => {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir cliente');
            });
    }
}

// Funções para limpar formulários
function limparFormularioCadastro() {
    cpfCliente.value = '';
    nomeCliente.value = '';
    emailCliente.value = '';
    telefoneCliente.value = '';
    enderecoCliente.value = '';
    cidadeCliente.value = '';
    estadoCliente.value = '';
}

function limparBusca() {
    buscaCpfCliente.value = '';
    editarNomeCliente.value = '';
    editarEmailCliente.value = '';
    editarTelefoneCliente.value = '';
    editarEnderecoCliente.value = '';
    editarCidadeCliente.value = '';
    editarEstadoCliente.value = '';
}

// Máscaras para campos
cpfCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

buscaCpfCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

telefoneCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

editarTelefoneCliente.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

// Event listeners
btnCadastrarCliente.addEventListener('click', cadastrarCliente);
btnBuscarCliente.addEventListener('click', buscarCliente);
btnAtualizarCliente.addEventListener('click', atualizarCliente);
btnExcluirCliente.addEventListener('click', excluirCliente);