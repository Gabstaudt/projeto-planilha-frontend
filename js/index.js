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

    // Abrir modal de adicionar tarefa
    const modal = document.getElementById('modalAdicionarTarefa');
    const adicionarTarefaBtn = document.getElementById('adicionarTarefaBtn');
    const closeModalBtn = document.querySelector('.close-btn');
    
    adicionarTarefaBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Formulário de adicionar tarefa
    const formAdicionarTarefa = document.getElementById('formAdicionarTarefa');
    formAdicionarTarefa.addEventListener('submit', async (event) => {
        event.preventDefault();

        const paraQuem = document.getElementById('paraQuem').value;
        const dataValidade = document.getElementById('dataValidade').value;
        const tituloTarefa = document.getElementById('tituloTarefa').value;
        const descricaoTarefa = document.getElementById('descricaoTarefa').value;

        try {
            const response = await fetch('http://localhost:3000/api/tarefas/adicionar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuarioLogado.token}`
                },
                body: JSON.stringify({
                    titulo: tituloTarefa,
                    descricao: descricaoTarefa,
                    nomeUsuario: paraQuem,
                    data_vencimento: dataValidade
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao adicionar tarefa:', errorData);
                throw new Error(errorData.error || 'Erro ao adicionar tarefa.');
            }

            console.log('Tarefa adicionada com sucesso.');

            // Fechar o modal e recarregar as tarefas
            modal.style.display = 'none';
            carregarTarefas(usuarioLogado.usuario_id);
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            alert('Erro ao adicionar tarefa. Tente novamente mais tarde.');
        }
    });
});

async function carregarTarefas(usuarioId) {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/listar/${usuarioId}`, {
            headers: {
                'Authorization': `Bearer ${usuarioLogado.token}`
            }
        });

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
                <button class="concluir-btn" data-id="${tarefa.id}">Concluir Tarefa</button>
            `;
            listaTarefas.appendChild(li);
        });

        // Adicionar evento para cada botão de "Concluir Tarefa"
        document.querySelectorAll('.concluir-btn').forEach(button => {
            button.addEventListener('click', concluirTarefa);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        document.getElementById('listaTarefas').textContent = 'Erro ao carregar tarefas.';
    }
}

async function concluirTarefa(event) {
    const tarefaId = event.target.getAttribute('data-id');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    try {
        const response = await fetch(`http://localhost:3000/api/tarefas/concluir/${tarefaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usuarioLogado.token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao concluir tarefa:', errorData);
            throw new Error(errorData.error || 'Erro ao concluir tarefa.');
        }

        console.log('Tarefa concluída e removida com sucesso.');

        // Recarregar as tarefas
        carregarTarefas(usuarioLogado.usuario_id);
    } catch (error) {
        console.error('Erro ao concluir tarefa:', error);
        alert('Erro ao concluir tarefa. Tente novamente mais tarde.');
    }
}