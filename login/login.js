document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const login = document.getElementById('login').value.trim(); // Pode ser email ou nome de usuário
        const senha = document.getElementById('senha').value.trim();

        if (!login || !senha) {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        // Construir o corpo da requisição dinamicamente
        const body = {
            senha: senha
        };

        // Verificar se o valor digitado é um email
        if (login.includes('@')) {
            body.email = login;
        } else {
            body.nomeUsuario = login;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro no login:', errorData);
                errorMessage.textContent = errorData.error || 'Erro ao realizar login.';
                return;
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);

            // Salvar os dados do usuário no localStorage
            localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));

            // Redirecionar para a página principal
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            errorMessage.textContent = 'Erro ao realizar login. Tente novamente mais tarde.';
        }
    });
});
