async function excluirAnimal() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    const tokenJWT = localStorage.getItem("token");

    const idAnimal = localStorage.getItem("animalId");

    const data = { id_animal: Number(idAnimal)}
    console.log(typeof data.id_animal)

    try {
        const response = await fetch('https://conectando-vidas-backend.onrender.com/animal', {
            method: 'DELETE',
            headers: {
                'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Resposta do backend:', result);

        if (response.ok) {
          alert('Exclusão realizada com sucesso!');
          window.location.href = './adocao.html'
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