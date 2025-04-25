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
    
    // Verifica se os elementos existem antes de manipulá-los
    if (botaoEntrar) {
      botaoEntrar.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    if (botaoCadastrar) {
      botaoCadastrar.style.display = isLoggedIn ? 'none' : 'block';
    }
    
    if (botaoSair) {
      botaoSair.style.display = isLoggedIn ? 'block' : 'none';
      
      // Adiciona evento de logout ao botão sair se ele existir
      if (isLoggedIn) {
        botaoSair.addEventListener('click', function(e) {
          // Previne o comportamento padrão do link
          if (e && e.preventDefault) {
            e.preventDefault();
          }
          
          // Remove ambos os possíveis tokens de autenticação
          localStorage.removeItem('token');
          localStorage.removeItem('usuarioLogado');
          
          // Recarrega a página
          window.location.reload();
        });
      }
    }
  }
  
  // Verifica se a página atual requer autenticação
  function checkRequiresAuth() {
    // Lista de páginas que requerem autenticação
    // Removidas voluntariado.html e sobre.html conforme solicitado pelo usuário
    const authPages = [
      'depoimentos.html',
      'adocao.html',
      'doacao.html'
      // Adicione outras páginas que requerem autenticação, exceto voluntariado.html e sobre.html
    ];
    
    // Obtém o caminho da página atual
    const currentPath = window.location.pathname;
    
    // Verifica se a página atual está na lista de páginas que requerem autenticação
    for (let i = 0; i < authPages.length; i++) {
      if (currentPath.indexOf(authPages[i]) !== -1) {
        return true;
      }
    }
    
    return false;
  }
  
  // Função principal que verifica autenticação e redireciona se necessário
  function init() {
    const isLoggedIn = checkLoginStatus();
    const requiresAuth = checkRequiresAuth();
    
    // Se a página requer autenticação e o usuário não está logado
    if (requiresAuth && !isLoggedIn) {
      // Determina o caminho para a página de login
      let loginPath = '';
      
      // Verifica se estamos em uma subpasta
      if (window.location.pathname.includes('/html/')) {
        loginPath = 'entrar.html';
      } else {
        loginPath = 'html/entrar.html';
      }
      
      // Redireciona para a página de login
      window.location.href = loginPath;
    }
  }
  
  // Executa a verificação imediatamente
  init();
  
  // Também verifica quando o DOM estiver completamente carregado
  document.addEventListener('DOMContentLoaded', init);
})();
