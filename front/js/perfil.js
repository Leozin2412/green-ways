document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "http://localhost:3000";
  const DEFAULT_AVATAR =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='50' fill='%23e5e7eb'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%239ca3af'>+</text></svg>";

  const elements = {
    form: document.getElementById("profile-form"),
    fotoInput: document.getElementById("foto"),
    fotoPreview: document.getElementById("foto-preview"),
    menuFoto: document.getElementById("menu-foto"),
    usernameInput: document.getElementById("username"),
    currentPasswordInput: document.getElementById("current-password"),
    newPasswordInput: document.getElementById("new-password"),
    confirmPasswordInput: document.getElementById("confirm-password"),
    modalConfirm: document.getElementById("modal-confirm"),
  };

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  if (!token || !currentUser) {
    window.location.href = "login.html";
    return;
  }

  function init() {
    loadProfileData();
    setupEventListeners();
  }

  function loadProfileData() {
    elements.usernameInput.value = currentUser.nome || "";

    if (!currentUser.foto) {
      elements.fotoPreview.src = DEFAULT_AVATAR;
      return;
    }

    const userId = currentUser.id;
    const timestamp = new Date().getTime();
    elements.fotoPreview.src = `/public/uploads/profile_${userId}.jpg?${timestamp}`;
    elements.fotoPreview.onerror = () => {
      elements.fotoPreview.src = DEFAULT_AVATAR;
    };
  }

  function setupEventListeners() {
    elements.fotoPreview.addEventListener("click", () => {
      elements.menuFoto.style.display = "block";
    });

    elements.fotoInput.addEventListener("change", handleFileSelect);
    elements.form.addEventListener("submit", handleFormSubmit);
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|png)/) || file.size > 5 * 1024 * 1024) {
      alert("Selecione uma imagem JPEG/PNG (até 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => (elements.fotoPreview.src = e.target.result);
    reader.readAsDataURL(file);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (
      elements.newPasswordInput.value !== elements.confirmPasswordInput.value
    ) {
      alert("As senhas não coincidem!");
      return;
    }

    // try {
      const formData = new FormData();
      if (elements.fotoInput.files[0]) {
        formData.append("foto", elements.fotoInput.files[0]);
      }
      formData.append("id", currentUser.id);
      formData.append("nome", elements.usernameInput.value);
      formData.append("currentPassword", elements.currentPasswordInput.value);
      formData.append("email", currentUser.email);
      formData.append("newPassword", elements.newPasswordInput.value);
      formData.append("confirmPassword", elements.confirmPasswordInput.value);

      const queryParams = new URLSearchParams({
        id: currentUser.id,
        currentPassword: elements.currentPasswordInput.value,
      });
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/users/updateProfile?${queryParams}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        alert("Perfil atualizado!");
        window.location.reload();
      } else {
        alert(data.message || "Erro ao atualizar perfil");
      }
    // } catch (error) {
    //   console.error("Erro:", error);
    //   alert("Erro ao atualizar perfil");
    // }
  }

  window.abrirSeletor = () => {
    elements.fotoInput.click();
    elements.menuFoto.style.display = "none";
  };

  window.removerFoto = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/removePhoto?id=${currentUser.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        window.location.href = "login.html";
        return;
      }

      const data = await response.json();
      if (data.ok) {
        elements.fotoPreview.src = DEFAULT_AVATAR;
        elements.menuFoto.style.display = "none";
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      } else {
        alert(data.message || "Erro ao remover foto");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  window.confirmarExclusao = () => {
    elements.modalConfirm.style.display = "flex";
  };

  window.fecharModal = () => {
    elements.modalConfirm.style.display = "none";
  };

  document
    .querySelector(".back-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        window.location.href = this.getAttribute("href");
        this.style.transform = "";
      }, 200);
    });

  window.excluirConta = async () => {
    const deleteBtn = document.querySelector(".confirm");
    const spinner = document.getElementById("delete-spinner");

    try {
      deleteBtn.disabled = true;
      spinner.style.display = "inline-block";

      const response = await fetch(`${API_BASE_URL}/users/deleteUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: currentUser.email,
          id: currentUser.id,
        }),
      });

      if (response.status === 401) {
        window.location.href = "login.html";
        return;
      }

      const data = await response.json();
      if (data.ok) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        alert("Conta excluída com sucesso!");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Erro ao excluir conta");
        fecharModal();
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
    } finally {
      deleteBtn.disabled = false;
      spinner.style.display = "none";
    }
  };

  init();
});