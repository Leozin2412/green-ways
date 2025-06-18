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
      `https://green-ways-production.up.railway.app/users/get-by-id?id=${id}`,
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
    
    if (this.options[0].value === "" && this.options[0].disabled) {
      this.remove(0);
    }

    if (estado) {
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
      document.querySelector("#estado-selecionado").textContent = "";
      document.querySelector("#cidade-selecionada").textContent = "";
    }
  });

  document.querySelector("#cidades").addEventListener("change", function() {
    const cidadeSelecionada = this.options[this.selectedIndex].text;
    const cidadeElement = document.querySelector("#cidade-selecionada");
    if (cidadeElement) {
      cidadeElement.textContent = `Cidade selecionada: ${cidadeSelecionada}`;
    }
  });
});

const postCommentsState = {};

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
          let photoFileName = userData.foto;
          if (photoFileName.startsWith('/uploads/')) {
            photoFileName = photoFileName.substring('/uploads/'.length);
          } else if (photoFileName.startsWith('uploads/')) {
            photoFileName = photoFileName.substring('uploads/'.length);
          }
          
          const timestamp = new Date().getTime(); 
          profilePic.src = `https://green-ways-production.up.railway.app/uploads/${photoFileName}?${timestamp}`;
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
    document.querySelectorAll('.responses').forEach(responsesElement => {
        const postId = responsesElement.id.replace('responses-', '');
        postCommentsState[postId] = responsesElement.style.display === 'block';
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://green-ways-production.up.railway.app/posts", {
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
            post.idPost,
            post.userId,
            post.userFoto,
            post.responses || []
          );
          postList.appendChild(postElement);
          
          displayResponses(post.idPost, post.responses || [], postCommentsState[post.idPost] || false); 
        });
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  }

  function createPostElement(userName, region, content, postId, userId, userFoto, responses = []) {
    const post = document.createElement("article");
    post.className = "post";

    let photoFileName = "default-profile.png"; 
    if (userFoto) {
      if (userFoto.startsWith('/uploads/')) {
        photoFileName = userFoto.substring('/uploads/'.length);
      } else if (userFoto.startsWith('uploads/')) {
        photoFileName = userFoto.substring('uploads/'.length);
      } else {
        photoFileName = userFoto; 
      }
    }
    const photoSrc = `https://green-ways-production.up.railway.app/uploads/${photoFileName}`;


    post.innerHTML = `
    <div class="caixa-resposta">
        <div class="user-profile">
            <img src="${photoSrc}" 
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
            <button class="delete-post-btn" data-post-id="${postId}">Excluir</button>
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
    const deletePostBtn = post.querySelector(".delete-post-btn");

    if (currentUser.id !== userId && !userIsAdmin) {
      deletePostBtn.style.display = "none";
    }

    deletePostBtn.addEventListener("click", async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`https://green-ways-production.up.railway.app/posts/delete/${postId}`, {
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
        else alert(data.message || "Erro ao deletar post.");
      } catch (error) {
        console.error("Erro ao deletar post:", error);
        alert("Erro ao conectar com o servidor para deletar post.");
      }
    });

    const replyBtn = post.querySelector(".reply-btn");
    const responseFormContainer = post.querySelector(".response-form-container");
    const toggleResponsesBtn = post.querySelector(".toggle-responses-btn");
    
    toggleResponsesBtn.style.display = "inline-block"; 
    toggleResponsesBtn.textContent = "Mostrar Comentários"; 

    replyBtn.addEventListener("click", () => {
      responseFormContainer.style.display = responseFormContainer.style.display === "block" ? "none" : "block";
    });

    toggleResponsesBtn.addEventListener("click", () => {
      const responsesElement = document.getElementById(`responses-${postId}`); 
      if (!responsesElement) {
        console.error(`Container de respostas para postId ${postId} não encontrado ao tentar alternar.`);
        return;
      }
      
      const noCommentsMessage = responsesElement.querySelector(".no-comments-message");

      const isCurrentlyVisible = responsesElement.style.display === "block";
      responsesElement.style.display = isCurrentlyVisible ? "none" : "block";
      
      toggleResponsesBtn.textContent = isCurrentlyVisible ? "Mostrar Comentários" : "Ocultar Comentários";
      
      if (responses.length === 0) { 
          if (noCommentsMessage) {
            noCommentsMessage.style.display = responsesElement.style.display === "block" ? "block" : "none";
          }
      } else { 
          if (noCommentsMessage) noCommentsMessage.style.display = "none";
      }

      postCommentsState[postId] = responsesElement.style.display === 'block';
    });

    const responseForm = responseFormContainer.querySelector("form");
    responseForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const responseContent = responseForm.querySelector(".response-content").value;

      try {
        const response = await fetch("https://green-ways-production.up.railway.app/posts/response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            postId: postId,
            userId: currentUser.id, 
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
          loadPosts();
        } else {
            alert(data.message || "Erro ao adicionar resposta.");
        }
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
        alert("Erro ao conectar com o servidor para adicionar resposta.");
      }
    });

    return post;
  }

  function displayResponses(postId, responses, shouldBeVisible = false) {
    const responsesContainer = document.getElementById(`responses-${postId}`);
    const toggleButton = document.querySelector(`.toggle-responses-btn[data-post-id="${postId}"]`);
    
    if (!responsesContainer) {
      console.error(`Container de respostas para postId ${postId} não encontrado.`);
      return;
    }

    const noCommentsMessage = responsesContainer.querySelector(".no-comments-message");

    Array.from(responsesContainer.children).forEach(child => {
        if (!child.classList.contains('no-comments-message')) {
            responsesContainer.removeChild(child);
        }
    });

    if (responses.length === 0) {
      if (noCommentsMessage) {
          noCommentsMessage.style.display = shouldBeVisible ? "block" : "none"; 
      }
      responsesContainer.style.display = shouldBeVisible ? "block" : "none"; 

      if (toggleButton) {
          toggleButton.textContent = shouldBeVisible ? "Ocultar Comentários" : "Mostrar Comentários";
      }
    } else { 
      if (noCommentsMessage) {
          noCommentsMessage.style.display = "none"; 
      }
      responses.forEach((response) => {
        const responseElement = document.createElement("div");
        responseElement.className = "response";
        let photoFileName = "default-profile.png"; 
        if (response.userFoto) {
          if (response.userFoto.startsWith('/uploads/')) {
            photoFileName = response.userFoto.substring('/uploads/'.length);
          } else if (response.userFoto.startsWith('uploads/')) {
            photoFileName = response.userFoto.substring('uploads/'.length);
          } else {
            photoFileName = response.userFoto; 
          }
        }
        const photoSrc = `https://green-ways-production.up.railway.app/uploads/${photoFileName}`;


        responseElement.innerHTML = `
          <div class="user-profile">
            <img src="${photoSrc}" 
                 onerror="this.src='img/default-profile.png'" 
                 alt="Foto de ${response.userName}" 
                 class="profile-pic">
            <p><strong>${response.userName}:</strong> ${response.content}</p>
          </div>
          ${(currentUser.id === response.userId || userIsAdmin) ? `<button class="delete-response-btn" data-post-id="${postId}" data-response-id="${response.idResponse}">Excluir Resposta</button>` : ""}
        `;
        responsesContainer.appendChild(responseElement); 
      });

      responsesContainer.style.display = shouldBeVisible ? "block" : "none";
      if (toggleButton) {
        toggleButton.textContent = shouldBeVisible ? "Ocultar Comentários" : "Mostrar Comentários";
      }
    }
    if (toggleButton) toggleButton.style.display = "inline-block";
  }

  loadPosts();

  if (postForm) {
    postForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const estadoSelect = document.getElementById("estados");
      const cidadeSelect = document.getElementById("cidades");
      
      if (!estadoSelect.value || estadoSelect.value === "") {
        alert("Por favor, selecione um estado.");
        return;
      }
      
      if (!cidadeSelect.value || cidadeSelect.value === "") {
        alert("Por favor, selecione uma cidade.");
        return;
      }
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        window.location.href = "/login.html";
        return;
      }

      const userName = currentUser.nome;
      const estadoSelecionado = estadoSelect.options[estadoSelect.selectedIndex].text;
      const cidadeSelecionada = cidadeSelect.options[cidadeSelect.selectedIndex].text;
      const region = `${cidadeSelecionada}, ${estadoSelecionado}`;
      const content = document.getElementById("content").value;

      try {
        const response = await fetch("https://green-ways-production.up.railway.app/posts/create", {
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
          loadPosts();
          postForm.reset();
          estadoSelect.selectedIndex = 0;
          cidadeSelect.selectedIndex = 0;
          cidadeSelect.disabled = true;
          cidadeSelect.innerHTML = '<option value="" selected disabled> Selecione um estado primeiro </option>';
          document.querySelector("#estado-selecionado").textContent = "";
          document.querySelector("#cidade-selecionada").textContent = "";

        } else {
            alert(data.message || "Erro ao criar post.");
        }
      } catch (error) {
        console.error("Erro ao criar post:", error);
        alert("Erro ao conectar com o servidor para criar post.");
      }
    });
  }

  postList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-response-btn")) {
      const token = localStorage.getItem("token");
      const postId = event.target.getAttribute("data-post-id");
      const responseId = event.target.getAttribute("data-response-id");

      try {
        const response = await fetch("https://green-ways-production.up.railway.app/posts/response/delete", {
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
        else alert(data.message || "Erro ao deletar resposta.");
      } catch (error) {
        console.error("Erro ao deletar resposta:", error);
        alert("Erro ao conectar com o servidor para deletar resposta.");
      }
    }
  });
});
