async function excluirConta() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    const tokenJWT = localStorage.getItem("token");

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/usuario', {
            method: 'DELETE',
            headers: {
                'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
            }
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
          localStorage.removeItem('token');
          alert('Exclusão realizada com sucesso!');
          window.location.href = './entrar.html'
        } else {
          alert('Erro ao excluir: ' + result.message ? result.message : result.error);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao conectar com o servidor.');
    } finally {
        loader.style.display = "none";
    }
};