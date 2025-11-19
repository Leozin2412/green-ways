  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const erro = document.querySelector(".erro");

      try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            senha: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }

        const data = await response.json();
      
        if (data.ok) {
        // 2. Extrai o status 'ativo' do objeto do usuário
        const usuarioAtivo = data.user.ativo; 

      
        if (usuarioAtivo === true || usuarioAtivo === 1) { 
           
            localStorage.setItem("token", data.token);
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            window.location.href = "index.html";
        } else {
            
            erro.innerHTML = "*Sua conta está desativada. Entre em contato com o suporte.";
        }
    } else {
        // Credenciais inválidas (caso a API retorne !data.ok)
        erro.innerHTML = "*Usuário ou senha inválido!";
    }
    } catch (error) {
        console.error("Erro:", error);
        // Trata erros de rede, servidor, ou a exceção lançada por !response.ok
        erro.innerHTML = "*Erro ao tentar fazer login. Verifique sua conexão ou credenciais.";
    }
    });

