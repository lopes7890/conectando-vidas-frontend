const form = document.getElementById('atualizarUsuario');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    const tokenJWT = localStorage.getItem("token");

    // Cria um objeto com os dados do formulário
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            data[key] = value;
        }
    }

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/atualizar/usuario', {
            method: 'PUT',
            headers: {
                'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
                'Content-Type': 'application/json' // Se necessário, adicione o tipo de conteúdo
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
          alert('Atualização realizada com sucesso!');
          window.location.href = '../index.html'
        } else {
          alert('Erro ao atualizar: ' + result.message ? result.message : result.error);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao conectar com o servidor.');
    } finally {
        loader.style.display = "none";
    }
});