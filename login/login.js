document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
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
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            errorMessage.textContent = 'Erro ao realizar login. Tente novamente mais tarde.';
        }
    });
});
