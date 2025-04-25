
document.addEventListener("DOMContentLoaded", () => {
    esconderBotao(); // chamado assim que o HTML estiver pronto
});

export const esconderBotao = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      // Só mostra se NÃO estiver logado
      const botaoCadastrar = document.getElementById("botaoCadastrar");
      const botaoEntrar = document.getElementById("botaoEntrar");
  
      if (botaoCadastrar) botaoCadastrar.style.display = "inline-block";
      if (botaoEntrar) botaoEntrar.style.display = "inline-block";
    }
  };