document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado) {
        window.location.href = 'login.html'; // Redirecionar para login se não estiver logado
        return;
    }

    // Exibir nome do usuário logado
    document.getElementById('usuarioNome').textContent = `Bem-vindo(a), ${usuarioLogado.nome}!`;

    // Carregar as tarefas atribuídas ao usuário
    carregarTarefas(usuarioLogado.nome);
});

async function carregarTarefas(nomeUsuario) {
    try {
        const response = await fetch(`http://localhost:3000/api/tarefas?usuario=${encodeURIComponent(nomeUsuario)}`);

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

        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = `${tarefa.titulo}: ${tarefa.descricao}`;
            listaTarefas.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        document.getElementById('listaTarefas').textContent = 'Erro ao carregar tarefas.';
    }
}
