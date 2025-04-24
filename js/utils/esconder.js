
document.addEventListener('DOMContentLoaded', () => {
    esconderBotao(); // ✅ chamado depois que a página estiver pronta
  });


export const esconderBotao = () => {
    const token = localStorage.getItem("token");

    if (token) {
    // Se estiver logado, oculta os botões
        document.getElementById("botaoCadastrar").style.display = "none";
        document.getElementById("botaoEntrar").style.display = "none";
  }
}