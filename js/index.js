document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        window.location.href = 'login.html'; // Redirecionar para login se não estiver logado
        return;
    }

    // Exibir nome do usuário logado
    document.getElementById('usuarioNome').textContent = `Bem-vindo(a), ${usuarioLogado.nome}!`;

    // Carregar as tarefas atribuídas ao usuário
    carregarTarefas(usuarioLogado.usuario_id);
});

async function carregarTarefas(usuarioId) {
    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/listar/${usuarioId}`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao carregar tarefas:', errorData);
            throw new Error(errorData.error || 'Erro ao carregar tarefas.');
        }

        const tarefas = await response.json();
        const listaTarefas = document.getElementById('listaTarefas');

        listaTarefas.innerHTML = ''; // Limpar lista antes de adicionar tarefas

        if (tarefas.message) {
            listaTarefas.textContent = tarefas.message;
            return;
        }

        // Renderizar as tarefas na lista
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${tarefa.titulo}</h3>
                <p>${tarefa.descricao}</p>
                <p><strong>Enviada por:</strong> ${tarefa.enviadaPor}</p>
                <p><strong>Data de Vencimento:</strong> ${tarefa.data_vencimento ? new Date(tarefa.data_vencimento).toLocaleDateString() : 'Sem data de vencimento'}</p>
            `;
            listaTarefas.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        document.getElementById('listaTarefas').textContent = 'Erro ao carregar tarefas.';
    }
}
