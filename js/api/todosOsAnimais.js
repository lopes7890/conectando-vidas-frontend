const apiUrl = "https://conectando-vidas-backend.onrender.com/animals";
let todosOsAnimaisGlobal = [];

const loaderElement = document.getElementById("loader");
const animaisContainerElement = document.getElementById("animais-container");
const filtroNomeElement = document.getElementById("filtro-nome");
const filtroIdadeElement = document.getElementById("filtro-idade");
const filtroSexoElement = document.getElementById("filtro-sexo");

const exibirLoader = (exibir) => {
    if (loaderElement) {
        loaderElement.style.display = exibir ? "flex" : "none";
    }
};

const renderizarCardsAnimais = (listaAnimais) => {
    if (!animaisContainerElement) return;
    animaisContainerElement.innerHTML = "";

    if (listaAnimais.length === 0) {
        animaisContainerElement.innerHTML = 
            '<p class="col-span-full text-center text-gray-600 py-8">Nenhum animal encontrado com os filtros aplicados.</p>';
        return;
    }

      // Criando o HTML de cada cartão de animal
    listaAnimais.forEach(animal => {
        const divAnimal = document.createElement("div");
        divAnimal.classList.add("animal-card", "bg-white", "p-6", "rounded-lg", "shadow-lg", "flex", "flex-col", "justify-between");

        // Criando a imagem do animal
        const img = document.createElement("img");
        img.src = (animal.foto && animal.foto.trim() !== "") ? animal.foto : "https://via.placeholder.com/300x200?text=Sem+Foto";
        img.alt = animal.nome || "Animal sem nome";
        img.classList.add("w-full", "h-48", "object-cover", "rounded-lg", "mb-4");

         // Criando o título (nome do animal)
        const h2 = document.createElement("h2");
        h2.classList.add("text-xl", "font-semibold", "text-primary", "mb-2");
        h2.textContent = animal.nome || "Nome não disponível";

         // Criando a descrição do animal (idade, sexo, porte)
        let formatarDescricao = animal.descricao
        if(formatarDescricao.length >= 50){
            formatarDescricao = formatarDescricao.slice(0, 30) + '...'
        }
        const p = document.createElement("p");
        p.classList.add("text-gray-600", "mb-4", "text-sm", "flex-grow");
        p.innerHTML = `
          <strong>Idade:</strong> ${animal.idade !== null && animal.idade !== undefined ? animal.idade : "Não informada"} anos<br>
          <strong>Sexo:</strong> ${animal.sexo || "Não informado"}<br>
          <strong>Descrição:</strong> ${formatarDescricao || "Não informada"}
        `;

        // Criando o botão de adoção
        const a = document.createElement("a");
        a.href = `../html/perfil_animal.html?id=${animal.id_animal}`;
        a.classList.add("mt-auto");

        const button = document.createElement("button");
        button.classList.add("bg-primary", "text-white", "px-6", "py-2", "rounded-button", "hover:bg-primary/90", "w-full", "transition", "duration-150");
        button.textContent = "Ver Detalhes";

         // Montando o cartão com os elementos criados
        a.appendChild(button);
        divAnimal.appendChild(img);
        divAnimal.appendChild(h2);
        divAnimal.appendChild(p);
        divAnimal.appendChild(a);

        animaisContainerElement.appendChild(divAnimal);
    });
};

const filtrarEExibirAnimais = () => {
    const termoNome = filtroNomeElement ? filtroNomeElement.value.toLowerCase().trim() : "";
    const termoIdade = filtroIdadeElement ? filtroIdadeElement.value.toLowerCase().trim() : "";
    const termoSexo = filtroSexoElement ? filtroSexoElement.value.toLowerCase() : "";

    const animaisFiltrados = todosOsAnimaisGlobal.filter(animal => {
        const nomeMatch = termoNome === "" || (animal.nome && animal.nome.toLowerCase().includes(termoNome));
        const idadeAnimalStr = animal.idade !== null && animal.idade !== undefined ? String(animal.idade).toLowerCase() : "";
        const idadeMatch = termoIdade === "" || idadeAnimalStr.includes(termoIdade);
        const sexoAnimalStr = animal.sexo ? animal.sexo.toLowerCase() : "";
        const sexoMatch = termoSexo === "" || sexoAnimalStr === termoSexo;
        return nomeMatch && idadeMatch && sexoMatch;
    });

    renderizarCardsAnimais(animaisFiltrados);
};

// Adicionando o cartão ao container
const carregarTodosAnimais = async () => {
    exibirLoader(true);
    try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        todosOsAnimaisGlobal = await resposta.json();
        renderizarCardsAnimais(todosOsAnimaisGlobal);
    } catch (erro) {
        if (animaisContainerElement) {
            animaisContainerElement.innerHTML = `<p class="col-span-full text-center" style="color:red;">Erro ao carregar animais: ${erro.message}. Tente novamente mais tarde.</p>`;
        }
        console.error("Erro ao carregar animais:", erro);
    } finally {
        exibirLoader(false);
    }
};

if (filtroNomeElement) filtroNomeElement.addEventListener("input", filtrarEExibirAnimais);
if (filtroIdadeElement) filtroIdadeElement.addEventListener("input", filtrarEExibirAnimais);
if (filtroSexoElement) filtroSexoElement.addEventListener("change", filtrarEExibirAnimais);

document.addEventListener("DOMContentLoaded", carregarTodosAnimais);
