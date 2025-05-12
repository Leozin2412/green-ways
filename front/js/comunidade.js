const lastAccess = localStorage.getItem("lastAccess");
function estados() {
  carregarLocalidades("estados");
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function isAdmin() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const decodedToken = parseJwt(token);
  return decodedToken && decodedToken.acesso === 'admin';
}

async function fetchUserProfile(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/users/get-by-id?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
    const data = await response.json();
    return data.ok ? data.user : null;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
}

async function carregarLocalidades(tipo, estado = "") {
  let url = "";
  if (tipo === "estados") {
    url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  } else if (tipo === "cidades" && estado) {
    url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`;
  } else {
    console.error("Tipo inválido ou estado não especificado para carregar cidades.");
    return;
  }

  try {
    const resp = await fetch(url);
    const dados = await resp.json();
    const select = document.querySelector(tipo === "estados" ? "#estados" : "#cidades");
    
    select.innerHTML = "";
    
    if (tipo === "estados") {
      select.innerHTML = '<option value="" selected disabled> Selecione um estado </option>';
    } else {
      select.innerHTML = '<option value="" selected disabled> Selecione uma cidade </option>';
    }

    dados.sort((a, b) => a.nome.localeCompare(b.nome))
         .forEach((obj) => {
      if (tipo === "estados") {
        select.innerHTML += `<option value="${obj.sigla}">${obj.nome}</option>`;
      } else {
        select.innerHTML += `<option value="${obj.nome}">${obj.nome}</option>`;
      }
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  carregarLocalidades("estados");
  
  const cidadeSelect = document.querySelector("#cidades");
  cidadeSelect.disabled = true;
  cidadeSelect.innerHTML = '<option value="" selected disabled> Selecione um estado primeiro </option>';

  document.querySelector("#estados").addEventListener("change", function() {
    const estado = this.value;
    const cidadeSelect = document.querySelector("#cidades");
    
    if (estado) {
      if (this.options[0].value === "" && this.options[0].disabled) {
        this.remove(0);
      }
      
      cidadeSelect.disabled = false;
      cidadeSelect.innerHTML = '<option value="" selected disabled> Carregando cidades... </option>';
      carregarLocalidades("cidades", estado);
      
      const estadoSelecionado = this.options[this.selectedIndex].text;
      const estadoElement = document.querySelector("#estado-selecionado");
      if (estadoElement) {
        estadoElement.textContent = `Estado selecionado: ${estadoSelecionado}`;
      }
    } else {
      cidadeSelect.disabled = true;
      cidadeSelect.innerHTML = '<option value="" selected disabled> Selecione um estado primeiro </option>';
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const userIsAdmin = isAdmin();

  if (!currentUser || !token) {
    window.location.href = "login.html";
    return;
  }

  async function loadUserProfile() {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !token) {
        window.location.href = "/login.html";
        return;
      }

      const profileContainer = document.querySelector(".user-profile");
      const profilePic = document.getElementById("user-profile-pic");
      const nameElement = document.querySelector(".namePost");
      if (!profileContainer || !profilePic || !nameElement) return;

      const userData = await fetchUserProfile(currentUser.id);

      if (userData) {
        nameElement.textContent = userData.nome;
        if (userData.foto) {
          const timestamp = new Date().getTime();
          profilePic.src = `/public/uploads/profile_${userData.id}.jpg?${timestamp}`;
          profilePic.alt = `Foto de ${userData.nome}`;
          profilePic.onerror = () => {
            profilePic.src = "img/default-profile.png";
          };
        } else {
          profilePic.src = "img/default-profile.png";
        }

        profileContainer.style.display = "flex";
      } else {
        profileContainer.style.display = "none";
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      window.location.href = "/login.html";
    }
  }

  await loadUserProfile();

  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");

  async function loadPosts() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        window.location.href = "/login.html";
        return;
      }

      const data = await response.json();
      postList.innerHTML = "";

      if (data.ok) {
        data.posts.forEach((post) => {
          const postElement = createPostElement(
            post.userName,
            post.region,
            post.content,
            post.id,
            post.userId
          );
          postList.appendChild(postElement);
          if (post.responses && post.responses.length > 0) {
            displayResponses(post.id, post.responses);
          }
        });
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  }

  function createPostElement(userName, region, content, postId, userId) {
    const post = document.createElement("article");
    post.className = "post";
    post.innerHTML = `
    <div class="caixa-resposta">
        <div class="user-profile">
            <img src="/public/uploads/profile_${userId}.jpg" 
                 onerror="this.src='img/default-profile.png'" 
                 alt="Foto de ${userName}" 
                 class="profile-pic">
            <span class="namePost">${userName}</span>
        </div>
        <p><strong>Destino:</strong> ${region}</p>
        <p class="post-content">${content}</p>
        <div class="responses-container">
            <button class="toggle-responses-btn" data-post-id="${postId}">Mostrar Comentários</button>
        </div>
        <div class="responses" id="responses-${postId}" style="display: none;">
            <p class="no-comments-message" style="display: none;">Este Post ainda não possui nenhum comentário.</p>
        </div>
        <div class="button-container">
            <button class="reply-btn" data-post-id="${postId}">Responder</button>
            <button class="delete-btn" data-post-id="${postId}">Excluir</button>
        </div>
        <div class="response-form-container" id="response-form-container-${postId}" style="display: none;">
            <form class="response-form" data-post-id="${postId}">
                <input type="text" class="response-content" placeholder="Escreva uma resposta" required />
                <div class="form-buttons">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </div>`;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const deleteBtn = post.querySelector(".delete-btn");

    if (currentUser.id !== userId && !userIsAdmin) {
      deleteBtn.style.display = "none";
    }

    deleteBtn.addEventListener("click", async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/posts/delete/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          window.location.href = "/login.html";
          return;
        }

        const data = await response.json();
        if (data.ok) loadPosts();
      } catch (error) {
        console.error("Erro ao deletar post:", error);
      }
    });

    const replyBtn = post.querySelector(".reply-btn");
    const responseFormContainer = post.querySelector(".response-form-container");
    const toggleResponsesBtn = post.querySelector(".toggle-responses-btn");
    const responsesContainer = post.querySelector(".responses");
    const noCommentsMessage = responsesContainer.querySelector(".no-comments-message");

    replyBtn.addEventListener("click", () => {
      responseFormContainer.style.display = responseFormContainer.style.display === "block" ? "none" : "block";
    });

    toggleResponsesBtn.addEventListener("click", () => {
      responsesContainer.style.display = responsesContainer.style.display === "block" ? "none" : "block";
      toggleResponsesBtn.textContent = responsesContainer.style.display === "block" ? "Ocultar Comentários" : "Mostrar Comentários";
      noCommentsMessage.style.display = responsesContainer.style.display === "block" && !responsesContainer.querySelector(".response") ? "block" : "none";
    });

    const responseForm = responseFormContainer.querySelector("form");
    responseForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const responseContent = responseForm.querySelector(".response-content").value;

      try {
        const response = await fetch("http://localhost:3000/posts/response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId,
            userName: currentUser.nome,
            content: responseContent,
          }),
        });

        if (response.status === 401) {
          window.location.href = "/login.html";
          return;
        }

        const data = await response.json();
        if (data.ok) {
          responseForm.reset();
          responseFormContainer.style.display = "none";
          displayResponses(postId, data.post.responses);
        }
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
      }
    });

    return post;
  }

  function displayResponses(postId, responses) {
    const responsesContainer = document.getElementById(`responses-${postId}`);
    const toggleButton = document.querySelector(`.toggle-responses-btn[data-post-id="${postId}"]`);
    responsesContainer.innerHTML = "";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    responses.forEach((response) => {
      const responseElement = document.createElement("div");
      responseElement.className = "response";
      responseElement.innerHTML = `
        <p><strong>${response.userName}:</strong> ${response.content}</p>
        ${currentUser.id === response.userId || userIsAdmin ? `<button class="delete-response-btn" data-post-id="${postId}" data-response-id="${response.id}">Excluir Resposta</button>` : ""}
      `;
      responsesContainer.appendChild(responseElement);
    });

    if (responses.length > 0) {
      responsesContainer.style.display = "block";
      toggleButton.style.display = "inline-block";
      toggleButton.textContent = "Ocultar Comentários";
    } else {
      responsesContainer.style.display = "none";
      toggleButton.style.display = "none";
    }
  }

  loadPosts();

  if (postForm) {
    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const estadoSelect = document.getElementById("estados");
      const cidadeSelect = document.getElementById("cidades");
      
      if (!estadoSelect.value || estadoSelect.value === "") {
        alert("Por favor, selecione um estado");
        return;
      }
      
      if (!cidadeSelect.value || cidadeSelect.value === "") {
        alert("Por favor, selecione uma cidade");
        return;
      }
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        window.location.href = "/login.html";
        return;
      }

      const userName = currentUser.nome;
      const estadoSelecionado = document.getElementById("estados").options[document.getElementById("estados").selectedIndex].text;
      const cidadeSelecionada = document.getElementById("cidades").options[document.getElementById("cidades").selectedIndex].text;
      const region = `${cidadeSelecionada}, ${estadoSelecionado}`;
      const content = document.getElementById("content").value;

      try {
        const response = await fetch("http://localhost:3000/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: currentUser.id,
            userName,
            region,
            content,
          }),
        });

        if (response.status === 401) {
          window.location.href = "/login.html";
          return;
        }

        const data = await response.json();
        if (data.ok) {
          const postElement = createPostElement(
            userName,
            region,
            content,
            data.post.id,
            currentUser.id
          );
          postList.appendChild(postElement);
          postForm.reset();
          document.getElementById("estados").selectedIndex = 0;
          document.getElementById("cidades").selectedIndex = 0;
        }
      } catch (error) {
        console.error("Erro ao criar post:", error);
      }
    });
  }

  postList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-response-btn")) {
      const token = localStorage.getItem("token");
      const postId = event.target.getAttribute("data-post-id");
      const responseId = event.target.getAttribute("data-response-id");

      try {
        const response = await fetch("http://localhost:3000/posts/response/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId, responseId }),
        });

        if (response.status === 401) {
          window.location.href = "/login.html";
          return;
        }

        const data = await response.json();
        if (data.ok) loadPosts();
      } catch (error) {
        console.error("Erro ao deletar resposta:", error);
      }
    }
  });
});