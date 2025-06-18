  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const erro = document.querySelector(".erro");

      try {
        const response = await fetch("https://green-ways-production.up.railway.app/users/login", {
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
          localStorage.setItem("token", data.token);
          localStorage.setItem("currentUser", JSON.stringify(data.user));
          window.location.href = "index.html";
        } else {
          erro.innerHTML = "*Usuário ou senha inválido!";
        }
      } catch (error) {
        console.error("Erro:", error);
        erro.innerHTML = "*Usuário ou senha inválido!";
      }
    });
