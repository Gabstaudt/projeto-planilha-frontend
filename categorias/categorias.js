document.getElementById('categoria-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const categoria = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria)
        });
        
        const result = await response.json();
        if (response.ok) {
            alert('Categoria adicionada com sucesso!');
        } else {
            alert('Erro ao adicionar categoria: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao se conectar com o servidor: ' + error.message);
    }
});
