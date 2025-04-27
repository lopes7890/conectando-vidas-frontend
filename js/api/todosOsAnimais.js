const carregarAnimais = async () => {
    try {
      const resposta = await fetch('https://conectando-vidas-backend.onrender.com/animals'); // Substitua pela URL do seu backend
      const animais = await resposta.json();

      const container = document.getElementById('animais-container');
      
      animais.forEach(animal => {
        // Criando o HTML de cada cartão de animal
        const divAnimal = document.createElement('div');
        divAnimal.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg');

        // Criando a imagem do animal
        const img = document.createElement('img');
        img.src = `https://conectando-vidas-backend.onrender.com/uploads/${animal.foto}`
        img.alt = `${animal.nome}`;
        img.classList.add('w-full', 'h-48', 'object-cover', 'rounded-lg', 'mb-4');
        
        // Criando o título (nome do animal)
        const h2 = document.createElement('h2');
        h2.classList.add('text-xl', 'font-semibold', 'text-primary');
        h2.textContent = animal.nome;
        
        // Criando a descrição do animal (idade, sexo, porte)
        const p = document.createElement('p');
        p.classList.add('text-gray-600', 'mb-4');
        p.innerHTML = `
          Idade: ${animal.idade} anos<br>
          Sexo: ${animal.sexo}<br>
          Descrição: ${animal.descricao}
        `;
        
        // Criando o botão de adoção
        const a = document.createElement('a');
        a.href = `../html/perfil_animal.html?id=${animal.id_animal}`; // Passando o ID do animal para o perfil
        const button = document.createElement('button');
        button.classList.add('bg-primary', 'text-white', 'px-6', 'py-2', 'rounded-button', 'hover:bg-primary/90', 'w-full');
        button.textContent = 'Adotar';
        
        // Montando o cartão com os elementos criados
        a.appendChild(button);
        divAnimal.appendChild(img);
        divAnimal.appendChild(h2);
        divAnimal.appendChild(p);
        divAnimal.appendChild(a);
        
        // Adicionando o cartão ao container
        container.appendChild(divAnimal);
      });
    } catch (erro) {
      console.error('Erro ao carregar animais:', erro);
    }
  }

  // Chama a função para carregar os animais ao carregar a página
  carregarAnimais();