const carregarInformacoesDoUsuario = async () => {
    try {

      const loader = document.getElementById("loader");
      loader.style.display = "flex";

      const tokenJWT = localStorage.getItem("token");

      if (!tokenJWT){
        window.location.href = './entrar.html';
        return;
      }
 
      const resposta = await fetch('https://conectando-vidas-backend.onrender.com/usuario', {
        method: 'GET',
        headers: {
            'Authorization': `${tokenJWT}`, // Adicionando o cabeçalho Authorization com o token JWT
            'Content-Type': 'application/json' // Se necessário, adicione o tipo de conteúdo
        }
        });

        const data = await resposta.json()
        if (resposta.ok){
            localStorage.setItem("tipoUser", data.tipo);
        } else {
            alert("erro ao obter dados do usuário");
        }
        
    } catch (erro) {
      console.error('Erro ao carregar perfil do animal:', erro);
    } finally {
      const loader = document.getElementById("loader");
      loader.style.display = "none";
  }
  }

carregarInformacoesDoUsuario();