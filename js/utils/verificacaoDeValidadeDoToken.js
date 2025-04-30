
const token = localStorage.getItem('token');
if (!token || verificandoToken(token)) {
  localStorage.removeItem('token');
  window.location.href = './html/entrar.html'; 
}

function verificandoToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now >= exp;
    } catch (e) {
      return true;
    }
}