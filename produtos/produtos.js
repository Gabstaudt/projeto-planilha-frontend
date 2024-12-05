document.getElementById('produto-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById('nome').value,
        preco_unitario: parseFloat(document.getElementById('preco').value),
        fornecedor: document.getElementById('fornecedor').value,
        codigo_produto: document.getElementById('codigo_produto').value,
        categoria_id: parseInt(document.getElementById('categoria_id').value)
    };

    try {
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
        } else {
            alert('Erro ao adicionar produto: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao se conectar com o servidor: ' + error.message);
    }
});
