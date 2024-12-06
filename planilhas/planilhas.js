let currentChart;

document.getElementById('gerar-grafico').addEventListener('click', async function () {
    try {
        const tipoDados = document.getElementById('dados-grafico').value;
        const response = await fetch(`http://localhost:3000/api/planilhas/${tipoDados}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados.');
        }

        const dados = await response.json();

        const labels = dados.map(item => item.nome);
        const data = dados.map(item => item.preco_unitario);

        const tipoGrafico = document.getElementById('tipo-grafico').value;

        const ctx = document.getElementById('graficoCanvas').getContext('2d');
        if (currentChart) {
            currentChart.destroy();
        }

        currentChart = new Chart(ctx, {
            type: tipoGrafico,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Dados Selecionados',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Gráfico Gerado'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        alert('Erro ao gerar o gráfico: ' + error.message);
    }
});

document.getElementById('apagar-grafico').addEventListener('click', function () {
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
});

document.getElementById('exportar-png').addEventListener('click', function () {
    const canvas = document.getElementById('graficoCanvas');
    const link = document.createElement('a');
    link.download = 'grafico.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

document.getElementById('exportar-jpg').addEventListener('click', function () {
    const canvas = document.getElementById('graficoCanvas');
    const link = document.createElement('a');
    link.download = 'grafico.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
});

document.getElementById('exportar-pdf').addEventListener('click', function () {
    const canvas = document.getElementById('graficoCanvas');
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
    pdf.save('grafico.pdf');
});

document.getElementById('tarefa-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo-tarefa').value;
    const nomeUsuario = document.getElementById('nome-usuario').value;
    const descricao = document.getElementById('descricao-tarefa').value;

    try {
        // Adicionar lógica para enviar tarefa ao backend
        alert(`Tarefa "${titulo}" atribuída a "${nomeUsuario}" adicionada com sucesso!`);
    } catch (error) {
        alert('Erro ao adicionar tarefa: ' + error.message);
    }
});
