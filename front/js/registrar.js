document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    document.querySelectorAll(".erro").forEach(el => el.innerHTML = "");
    
    if(!username) {
        document.querySelector(".name").innerHTML = "*Preencha com seu Nome!";
        return;
    }
    
    if(!email) {
        document.querySelector(".email").innerHTML = "*Preencha com um E-Mail válido!";
        return;
    }
    
    if(password.length < 8) {
        document.querySelector(".password").innerHTML = "*A senha deve conter no mínimo 8 caracteres.";
        return;
    }
    
    if(password !== confirmPassword) {
        document.querySelector(".passwordConfirm").innerHTML = "*As senhas não coincidem!";
        return;
    }

    try {
        const response = await fetch('https://green-ways-production.up.railway.app/users/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: username,
                email: email,
                senha: password,
                confirma: confirmPassword,
                foto: null
            })
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.message.includes("E-mail")) {
                document.querySelector(".email").innerHTML = `*${data.message}`;
            } else if (data.message.includes("Senhas")) {
                document.querySelector(".passwordConfirm").innerHTML = `*${data.message}`;
            } else {
                alert(data.message);
            }
            return;
        }

        window.location.href = '/login.html';
    } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro ao conectar com o servidor");
    }
});


