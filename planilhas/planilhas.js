document.getElementById('gerar-planilha').addEventListener('click', async function () {
    try {
        // Faz a requisição para o backend para obter todos os produtos
        const response = await fetch('http://localhost:3000/api/planilhas/produtos');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados dos produtos.');
        }

        const produtos = await response.json();

        // Gera a planilha a partir dos dados recebidos
        const worksheet = XLSX.utils.json_to_sheet(produtos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

        // Cria e baixa a planilha
        XLSX.writeFile(workbook, 'Produtos.xlsx');
    } catch (error) {
        alert('Erro ao gerar a planilha: ' + error.message);
    }
});
