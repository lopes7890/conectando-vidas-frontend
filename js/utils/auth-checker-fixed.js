// Script de verificação de autenticação para todas as páginas
// Coloque este arquivo na raiz do seu projeto (mesmo nível que a pasta html)

// Função autoexecutável para isolar o escopo
(function() {
  // Verifica se o usuário está logado assim que o script é carregado
  function checkLoginStatus() {
    // Verifica tanto 'token' quanto 'usuarioLogado' para compatibilidade
    const token = localStorage.getItem('token');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Se qualquer um dos dois existir, o usuário está logado
    const isLoggedIn = token || usuarioLogado;
    
    // Atualiza a UI baseado no estado de login
    updateUI(isLoggedIn);
    
    return isLoggedIn;
  }
  
  // Atualiza a interface baseada no estado de login
  function updateUI(isLoggedIn) {
    // Busca os botões de login, cadastro e sair
    const botaoEntrar = document.getElementById('botaoEntrar');
    const botaoCadastrar = document.getElementById('botaoCadastrar');
    const botaoSair = document.getElementById('botaoSair');
    const gearIconContainerId = 'gearIconContainer'; // ID para o container do ícone

    // Verifica se os elementos existem antes de manipulá-los
    if (botaoEntrar) {
      botaoEntrar.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    if (botaoCadastrar) {
      botaoCadastrar.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    // Remove o ícone de engrenagem existente para evitar duplicatas
    let existingGearIcon = document.getElementById(gearIconContainerId);
    if (existingGearIcon) {
      existingGearIcon.remove();
    }

    if (botaoSair) {
      botaoSair.style.display = isLoggedIn ? 'block' : 'none';
      
      if (isLoggedIn) {
        // Adiciona evento de logout ao botão sair se ele existir
        botaoSair.addEventListener('click', function(e) {
          if (e && e.preventDefault) {
            e.preventDefault();
          }
          localStorage.removeItem('token');
          localStorage.removeItem('usuarioLogado');
          window.location.reload();
        });

        // Cria e insere o ícone de engrenagem
        const gearIconContainer = document.createElement('a');
        gearIconContainer.id = gearIconContainerId;
        
        // Determina o caminho para perfil.html
        let perfilPath = '';
        if (window.location.pathname.includes('/html/')) {
          perfilPath = 'perfil.html'; // Se já está em /html/, o perfil.html estará no mesmo nível
        } else if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')){
          perfilPath = 'html/perfil.html'; // Se está na raiz (index.html), perfil.html está em /html/
        } else {
          // Caso para outras páginas na raiz, se houver.
          // Se suas páginas como 'sobre.html' etc., foram movidas para a raiz junto com index.html
          // e perfil.html está em /html/, então este caminho é necessário.
          // Se perfil.html também estiver na raiz, então seria 'perfil.html'
          perfilPath = 'html/perfil.html'; 
        }
        gearIconContainer.href = perfilPath;
        
        // Estilo básico para o ícone (pode ser melhorado com CSS)
        // Usando um caractere Unicode para a engrenagem: ⚙️
        gearIconContainer.innerHTML = '⚙️'; 
        gearIconContainer.style.marginLeft = '10px'; // Espaçamento do botão Sair
        gearIconContainer.style.fontSize = '1.5em'; // Tamanho do ícone
        gearIconContainer.style.textDecoration = 'none';
        gearIconContainer.style.color = '#0f4c35'; // Cor primária do seu tema
        gearIconContainer.title = 'Configurações do Perfil';

        // Insere o ícone depois do botão Sair
        // O botão Sair está dentro de um div com 'flex space-x-4 ml-10'
        // Vamos tentar inserir no mesmo container
        if (botaoSair.parentNode) {
            botaoSair.parentNode.insertBefore(gearIconContainer, botaoSair.nextSibling);
        } else {
            // Fallback se o botão Sair não tiver um pai óbvio (improvável no seu HTML)
            document.body.appendChild(gearIconContainer);
        }

      } 
    }
  }
  
  // Executa a verificação imediatamente
  checkLoginStatus();
  
  // Também verifica quando o DOM estiver completamente carregado
  document.addEventListener('DOMContentLoaded', checkLoginStatus);
})();
