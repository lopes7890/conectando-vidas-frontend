const carregarPerfilAnimal = async () => {
    try {

      const tokenJWT = localStorage.getItem("token");

      if (!tokenJWT){
        window.location.href = './entrar.html';
        return;
      }

      // Obter o ID do animal a partir da URL
      const urlParams = new URLSearchParams(window.location.search);

      console.log(urlParams)
      const idAnimal = urlParams.get('id'); 
      
      const resposta = await fetch(`https://conectando-vidas-backend.onrender.com/animal/${idAnimal}`, {
        method: 'GET',
        headers: {
            'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
            'Content-Type': 'application/json' // Se necessário, adicione o tipo de conteúdo
        }
        });
      const animal = await resposta.json();

      document.getElementById('animal-imagem').src = `https://conectando-vidas-backend.onrender.com/uploads/${animal.foto}`;
      document.getElementById('animal-nome').textContent = animal.nome;
      document.getElementById('animal-idade').innerHTML = `<span class="font-bold">Idade:</span> ${animal.idade} anos`;
      //document.getElementById('animal-nascimento').innerHTML = `<span class="font-bold">Nascimento:</span> ${animal.nascimento}`;
      //document.getElementById('animal-cor').innerHTML = `<span class="font-bold">Cor:</span> ${animal.cor}`;
      document.getElementById('animal-sexo').innerHTML = `<span class="font-bold">Sexo:</span> ${animal.sexo}`;
      //document.getElementById('animal-especial').innerHTML = `<span class="font-bold">Especial:</span> ${animal.especial}`;
      document.getElementById('animal-descricao').innerHTML = `<span class="font-bold">Descrição:</span> ${animal.descricao}`;
      document.getElementById('animal-status').innerHTML = `<span class="font-bold">Status:</span> ${animal.status_adocao}`;
    } catch (erro) {
      console.error('Erro ao carregar perfil do animal:', erro);
    }
  }

  // Chama a função para carregar os dados do animal ao carregar a página
  carregarPerfilAnimal();