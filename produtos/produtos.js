document.getElementById('produto-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const categoriaNome = document.getElementById('categoria_nome').value;

    try {
        // Primeiro, buscar a categoria pelo nome
        const responseCategoria = await fetch(`http://localhost:3000/api/categorias?nome=${encodeURIComponent(categoriaNome)}`);
        if (!responseCategoria.ok) {
            throw new Error('Erro ao buscar categoria.');
        }

        const categorias = await responseCategoria.json();
        if (categorias.length === 0) {
            alert('Categoria não encontrada.');
            return;
        }

        const categoriaId = categorias[0].categoria_id;

        const produto = {
            nome: document.getElementById('nome').value,
            preco_unitario: parseFloat(document.getElementById('preco').value),
            fornecedor: document.getElementById('fornecedor').value,
            categoria_id: categoriaId
        };

        // Adicionar o produto
        const response = await fetch('http://localhost:3000/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Produto adicionado com sucesso!');
            // Atualizar a lista de produtos
        } else {
            alert('Erro ao adicionar produto: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao se conectar com o servidor: ' + error.message);
    }
});

// Função para pesquisar produtos na lista exibida
function pesquisarProduto() {
    const termoPesquisa = document.getElementById('pesquisar-produto').value.toLowerCase();
    const produtos = document.querySelectorAll('#produtos-list .produto-item');

    produtos.forEach(produto => {
        const nomeProduto = produto.querySelector('.produto-nome').innerText.toLowerCase();
        if (nomeProduto.includes(termoPesquisa)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}
