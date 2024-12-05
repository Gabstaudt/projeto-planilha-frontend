document.getElementById('gerar-planilha').addEventListener('click', function () {
    const produtos = [
        { nome: "Produto A", preco: 10.5, fornecedor: "Fornecedor X" },
        { nome: "Produto B", preco: 20.0, fornecedor: "Fornecedor Y" },
        { nome: "Produto C", preco: 30.75, fornecedor: "Fornecedor Z" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(produtos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

    XLSX.writeFile(workbook, 'Produtos.xlsx');
});
