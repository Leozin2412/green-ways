const API_KEY = "5348656fe96c7f576bb986457386d2ac";
const API_URL = `https://gnews.io/api/v4/search?q=turismo+sustentável&lang=pt&country=br&max=9&apikey=${API_KEY}`;

async function carregarNoticias() {
  const container = document.getElementById("noticias");
  container.innerHTML = "<p>Carregando notícias...</p>";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    container.innerHTML = (data.articles && data.articles.length > 0)
      ? data.articles.map(article => {
          const descricao = article.description 
            ? article.description.slice(0, 150) + "..." 
            : "Clique abaixo para ler mais.";

          return `
            <div class="noticia">
              <img src="${article.image || 'https://via.placeholder.com/300x200'}" 
                   alt="${article.title || 'Notícia sem imagem'}">
              <div class="noticia-content">
                <h3>${article.title}</h3>
                <p>${descricao}</p>
                <a href="${article.url}" class="tip" target="_blank">Ver mais</a>
              </div>
            </div>
          `;
        }).join("")
      : "<p>Nenhuma notícia encontrada.</p>";

  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    container.innerHTML = "<p>Erro ao carregar notícias.</p>";
  }
}

carregarNoticias();