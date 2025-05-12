document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const token = localStorage.getItem("token");

  const nameElement = document.getElementById("username-display");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginIcon = document.querySelector(".login-icon");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() >= payload.exp * 1000;
      if (isExpired) {
        logout();
        return;
      }
    } catch (err) {
      logout();
      return;
    }
  }

  if (currentUser?.nome && token) {
    nameElement.textContent = currentUser.nome;
    nameElement.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
    logoutBtn.style.display = "inline-block";
    loginIcon.classList.add("logged");
    loginIcon.href = "perfil.html";
  } else {
    nameElement.textContent = "";
    logoutBtn.style.display = "none";
    loginIcon.classList.remove("logged");
    loginIcon.href = "login.html";
  }

  logoutBtn.addEventListener("click", logout);

  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      if (!response.ok) {
        try {
          const clone = response.clone();
          const data = await clone.json();
          if (data.code === "SESSION_EXPIRED") {
            logout();
          }
        } catch (err) {
          console.error("Erro ao processar JSON da resposta:", err);
        }
      }
      return response;
    };
  }

  function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    console.log("s")
    sessionStorage.clear();
    console.log("a")
    window.location.href = "index.html";
  }
});
