document.getElementById('movimentacao-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const movimentacao = {
        tipo: document.getElementById('tipo').value,
        quantidade: parseInt(document.getElementById('quantidade').value),
        produto_id: parseInt(document.getElementById('produto_id').value),
        usuario_id: parseInt(document.getElementById('usuario_id').value)
    };

    try {
        const response = await fetch('http://localhost:3000/api/movimentacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movimentacao)
        });

        const result = await response.json();
        if (response.ok) {
            alert('Movimentação adicionada com sucesso!');
        } else {
            alert('Erro ao adicionar movimentação: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao se conectar com o servidor: ' + error.message);
    }
});
