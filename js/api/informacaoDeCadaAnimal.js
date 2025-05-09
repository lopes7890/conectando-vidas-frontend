const carregarPerfilAnimal = async () => {
    try {

      const loader = document.getElementById("loader");
      loader.style.display = "flex";

      const tokenJWT = localStorage.getItem("token");

      if (!tokenJWT){
        window.location.href = './entrar.html';
        return;
      }


      const tipoUser = localStorage.getItem("tipoUser");
      console.log(tipoUser)

      if (tipoUser == "voluntario") {
        document.getElementById("excluirAnimal").style.display = "block"
      } else {
        document.getElementById("excluirAnimal").style.display = "none"
      }
      // Obter o ID do animal a partir da URL
      const urlParams = new URLSearchParams(window.location.search);

      console.log(urlParams)
      const idAnimal = urlParams.get('id'); 

      localStorage.setItem('animalId', idAnimal);
      
      const resposta = await fetch(`https://conectando-vidas-backend.onrender.com/animal/${idAnimal}`, {
        method: 'GET',
        headers: {
            'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
            'Content-Type': 'application/json' // Se necessário, adicione o tipo de conteúdo
        }
        });
      const animal = await resposta.json();

      document.getElementById('animal-imagem').src = `${animal.foto}`;
      document.getElementById('animal-nome').textContent = animal.nome;
      document.getElementById('animal-idade').innerHTML = `<span class="font-bold">Idade:</span> ${animal.idade} anos`;
      //document.getElementById('animal-nascimento').innerHTML = `<span class="font-bold">Nascimento:</span> ${animal.nascimento}`;
      //document.getElementById('animal-cor').innerHTML = `<span class="font-bold">Cor:</span> ${animal.cor}`;
      const sexoAnimalFormatado = animal.sexo.charAt(0).toUpperCase() + animal.sexo.substring(1)
      document.getElementById('animal-sexo').innerHTML = `<span class="font-bold">Sexo:</span> ${sexoAnimalFormatado}`;
      //document.getElementById('animal-especial').innerHTML = `<span class="font-bold">Especial:</span> ${animal.especial}`;
      document.getElementById('animal-descricao').innerHTML = `<span class="font-bold">Descrição:</span> ${animal.descricao}`;
      
      if (animal.status_adocao == "adotado"){
        document.getElementById('adotar').disabled = true
        document.getElementById('adotar').style.backgroundColor = "gray"
        document.getElementById('animal-status').innerHTML = `<span class="font-bold">Status:</span> ${animal.status_adocao}`;
      } else {
        document.getElementById('animal-status').innerHTML = `<span class="font-bold">Status:</span> disponível`;
      }

 

      
      
    } catch (erro) {
      console.error('Erro ao carregar perfil do animal:', erro);
    } finally {
      const loader = document.getElementById("loader");
      loader.style.display = "none";
  }
  }

  // Chama a função para carregar os dados do animal ao carregar a página
  carregarPerfilAnimal();