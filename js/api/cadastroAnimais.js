const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    const tokenJWT = localStorage.getItem("token");

    const formData = new FormData(form);

    // Garante que age seja número
    formData.set("age", Number(formData.get("age")));

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/cadastro/animais', {
            method: 'POST',
            headers: {
                'Authorization': `${tokenJWT}`
            },
            body: formData
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = './adocao.html';
        } else {
            alert('Erro ao cadastrar: ' + (result.message || result.error.message));
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao conectar com o servidor.');
    } finally {
        loader.style.display = "none";
    }
});
