const form = document.getElementById('formVoluntario');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const tokenJWT = localStorage.getItem("token");

    // Cria um objeto com os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.age = Number(data.age);

    try {
        const loader = document.getElementById("loader");
        loader.style.display = "flex";
        const response = await fetch('https://conectando-vidas-backend.onrender.com/cadastro/voluntario', {
            method: 'POST',
            headers: {
                'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
                'Content-Type': 'application/json' // Se necessário, adicione o tipo de conteúdo
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
          alert('Cadastro de voluntariado realizado com sucesso!');
          localStorage.setItem("tipoUser", "voluntario");
          localStorage.setItem("idVoluntario", result.idVoluntario)
          window.location.href = '../index.html'
        } else {
          alert('Erro ao cadastrar: ' + result.message ? result.message : result.error);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao conectar com o servidor.');
    } finally {
        loader.style.display = "none";
    }
});