const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    // Cria um objeto com os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.age = Number(data.age);

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/cadastro/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
          alert('Cadastro realizado com sucesso!');
          window.location.href = './entrar.html'
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