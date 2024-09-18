// Tirei essa const do else, para que ela seja executada adequadamente
const listaProdutos = document.getElementById('lista-produtos'); 

// Criei essas constantes, para que eu possa acessar os elementos do html 
const inputNome = document.querySelector("#input-nome");
const inputValor = document.querySelector("#input-valor");
const inputQuantidade = document.querySelector("#input-quantidade");
const botaoNovoProduto = document.querySelector("#botao-novo-produto");

// Fiz essa nova forma de adicionar produtos ao carrinho
// Adicionei um evento ao clicar o botão de 'Adicionar Produto'
botaoNovoProduto.addEventListener('click', function (evento) {
    evento.preventDefault();
    cadastrarProduto();
});

//Criei a função do botão
function cadastrarProduto() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoNovo = {
        id: carrinho.length + 1, //Coloquei esse id para que idenfique-se os produtos na função de remoção dos produtos da lista
        nome: inputNome.value,
        valor: inputValor.value,  
        quantidade: inputQuantidade.value  
    };

    carrinho.push(produtoNovo);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();

    // Adicionei para limpar os inputs depois de adicionar um produto a lista
    inputNome.value = '',
    inputValor.value = '',  
    inputQuantidade.value = ''  
}

// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {

    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adicionar o novo produto ao array
    carrinho.push({ id, nome, valor, quantidade });

     // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho(); // adicionei para atualizar sempre a exibição
}

// Função para remover um produto do carrinho
function removerProduto(id) {

    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho(); //adicionei para atualizar sempre a exibição
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {

    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    listaProdutos.innerHTML = ''; //coloquei pra limpar a mensagem da lista quando o for adicionar um item

    // Verificar se o carrinho está vazio
    if (carrinho && carrinho.length > 0) {
        // Exibir os produtos em um elemento HTML (ajuste conforme sua estrutura HTML)
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `${produto.nome} - Valor: R$ ${produto.valor} - Quantidade: ${produto.quantidade} 
            <button onclick="removerProduto(${produto.id})">Remover</button>`; 
            //adicionei esse botão para remover o produto pelo id, então é um botão que só surge quando tiver um item na lista
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();
