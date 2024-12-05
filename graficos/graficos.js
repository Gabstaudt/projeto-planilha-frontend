document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('movimentacoesChart').getContext('2d');

    // Simulação de dados; no futuro, você pode buscar esses dados da API
    const data = {
        labels: ['Produto A', 'Produto B', 'Produto C'],
        datasets: [{
            label: 'Movimentações (Quantidade)',
            data: [10, 15, 7], // Você pode buscar esses dados da API
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    const movimentacoesChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
