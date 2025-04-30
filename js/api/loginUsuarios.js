const form = document.getElementById('loginUsuario');


form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    // Cria um objeto com os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
            localStorage.setItem('token', result);
            //alert('Login realizado com sucesso!');
            window.location.href = '/index.html';
        } else {
          alert('Erro ao efetuar o login: ' + result.message ? result.message : result.error);
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao conectar com o servidor.');
    } finally {
        loader.style.display = "none";
    }

})