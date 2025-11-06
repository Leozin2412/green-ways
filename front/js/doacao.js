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

const modal = document.getElementById("modalDoacao");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("formDoacao");
const ongInput = document.getElementById("ongSelecionada");

// Abrir modal com ONG selecionada
document.querySelectorAll(".btn-doar").forEach(btn => {
  btn.addEventListener("click", () => {
    ongInput.value = btn.dataset.ong;
    modal.classList.remove("hidden");
  });
});

// Fechar modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

// Enviar "doação"
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    valor: document.getElementById("valor").value,
    ong: ongInput.value
  };

  const response = await fetch("http://localhost:3000/doacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  // links oficiais
  const links = {
    "WWF Brasil": "https://doe.wwf.org.br/",
    "SOS Mata Atlântica": "https://sosma.org.br/doacao",
    "Instituto Terra": "https://institutoterra.org/?form=doe",
    "ICMBio": "https://www.gov.br/icmbio/pt-br",
    "Conservação Internacional": "https://doe.conservacao.org.br/",
    "Instituto Semeia": "https://semeia.org.br/apoie/"
  };

  if (response.ok) {
    alert("Doação registrada! Agora você será redirecionado ao site oficial da ONG 💚");
    window.open(links[dados.ong], "_blank");
    modal.classList.add("hidden");
    form.reset();
  } else {
    alert("Erro ao registrar doação.");
  }
});