const termInput = document.getElementById("term-input");
const userInput = document.getElementById("user-input");
const resultsContainer = document.getElementById("results");
const paginationContainer = document.getElementById("pagination");
const modal = document.getElementById("repository-modal");
const modalBody = document.getElementById("modal-body");

// Configurações da API e paginação
const githubAPI = "https://api.github.com/search/repositories";
const perPage = 10;

// Estado da busca atual, usado também para manter a paginação consistente
let currentQuery = "";
let currentPage = 1;
let totalPages = 1;
let totalCount = 0;
let searchTimeout;

// Mensagem padronizada para tela inicial
const DEFAULT_MESSAGE = "Preencha o termo, e ou o nome do usuário para começar a busca.";
const resultsMessage = document.getElementById("results");

// Aguarda o usuário parar de digitar para evitar várias requisições consecutivas.
function scheduleSearch() {
  clearTimeout(searchTimeout);

  const term = termInput.value.trim();
  const username = userInput.value.trim();

  if (!term && !username) {
    currentQuery = "";
    paginationContainer.innerHTML = "";
    resultsMessage.textContent = DEFAULT_MESSAGE;
    return;
  }

  searchTimeout = setTimeout(() => search(term, username), 450);
}

// Inicializa o estado visual e registra listeners nos inputs
resultsMessage.textContent = DEFAULT_MESSAGE;
termInput.addEventListener("input", scheduleSearch);
userInput.addEventListener("input", scheduleSearch);

// Constrói a query e realiza a busca principal na API do GitHub
async function search(query, username = "") {
  currentQuery = username ? `${query} user:${username}` : query;
  if (!query) currentQuery = `user:${username}`;
  currentPage = 1;
  showLoading();
  const url = `${githubAPI}?q=${encodeURIComponent(currentQuery)}&sort=stars&per_page=${perPage}&page=${currentPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error("O limite de requisições da API do GitHub foi atingido. Tente novamente em alguns minutos.");}
        throw new Error("Não foi possível realizar a busca.");
    }

    const data = await response.json();
    const repositories = data.items || [];
    totalCount = data.total_count || 0;
    const maxResults = Math.min(totalCount, 1000);
    totalPages = Math.max(1, Math.ceil(maxResults / perPage));

    if (repositories.length === 0) {showEmptyState();} 
    else {showResults(repositories); renderPagination();} 
  }
  catch (error) {showError(error.message);}
}

// Exibe o estado de carregamento e limpa a paginação
function showLoading(message = "Buscando repositórios...") {
  resultsContainer.innerHTML = `<p class="state-loading">${message}</p>`;
  paginationContainer.innerHTML = "";
}

// Exibe o estado sem resultados encontrados
function showEmptyState(message = "Nenhum repositório encontrado para essa busca.") {
  resultsContainer.innerHTML = `<p class="state-empty">${message}</p>`;
  paginationContainer.innerHTML = "";
}

// Exibe mensagens de erro ao usuário
function showError(message) {
  resultsContainer.innerHTML = `<p class="state-error">${message || "Não foi possível realizar a busca. Tente novamente em instantes."}</p>`;
  paginationContainer.innerHTML = "";
}

// Cria uma lista nova para evitar misturar resultados de consultas anteriores
function showResults(repositories) {
  const list = document.createElement("ul");
  list.className = "repo-list";

  repositories.forEach((repo) => {list.appendChild(createRepoItem(repo));});
  resultsContainer.innerHTML = "";
  resultsContainer.appendChild(list);
}

// Valida a mudança de página e executa a nova busca se a página for válida
function goToPage(page) {
  if (!currentQuery) return;
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  if (page === currentPage) return;
  currentPage = page;
  fetchPage();
}

// Busca os dados de uma página específica ao navegar pela paginação
async function fetchPage() {
  showLoading();
  const url = `${githubAPI}?q=${encodeURIComponent(currentQuery)}&sort=stars&per_page=${perPage}&page=${currentPage}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na requisição de paginação');
    const data = await response.json();
    const repositories = data.items || [];
    if (repositories.length === 0) {showEmptyState();}
    else {showResults(repositories); renderPagination();}
  } catch (err) {showError(err.message);}
}

// Constrói os controles visuais de paginação (Anterior, Input de Página, Próxima)
function renderPagination() {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = "";

  // Botão Anterior
  const prev = document.createElement('button');
  prev.className = 'btn btn-prev';
  prev.textContent = 'Anterior';
  prev.disabled = currentPage <= 1;
  prev.addEventListener('click', () => goToPage(currentPage - 1));

  // Informação de total de páginas
  const info = document.createElement('div');
  info.className = 'page-info';
  info.textContent = `Página ${currentPage} de ${totalPages}`;

  // Input para digitação direta da página
  const pageInput = document.createElement('input');
  pageInput.className = 'page-input';
  pageInput.type = 'number';
  pageInput.min = '1';
  pageInput.max = String(totalPages);
  pageInput.value = String(currentPage);
  pageInput.setAttribute('aria-label', 'Número da página');
  pageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') goToPage(Number(pageInput.value));
  });

  // Botão Próxima
  const next = document.createElement('button');
  next.className = 'btn btn-next';
  next.textContent = 'Próxima';
  next.disabled = currentPage >= totalPages;
  next.addEventListener('click', () => goToPage(currentPage + 1));

  // Monta a estrutura no DOM
  paginationContainer.appendChild(prev);
  paginationContainer.appendChild(info);
  paginationContainer.appendChild(pageInput);
  paginationContainer.appendChild(next);
}

// Dados do repositório retornado pela API
function createRepoItem(repo) {
  const item = document.createElement("li");
  item.className = "repo-item";
  item.tabIndex = 0;
  item.setAttribute("role", "button");

  // Eventos para abrir modal via Clique ou Teclas (Enter / Espaço)
  item.addEventListener("click", () => showRepositoryDetails(repo));
  item.addEventListener("keydown", (event) => {if (event.key === "Enter" || event.key === " ") {event.preventDefault(); showRepositoryDetails(repo);}});

  const header = document.createElement("div");
  header.className = "repo-header";
  item.appendChild(header);

  const avatar = document.createElement("img");
  avatar.className = "repo-avatar";
  avatar.src = repo.owner.avatar_url;
  avatar.alt = `Foto de ${repo.owner.login}`;
  header.appendChild(avatar);

  const author = document.createElement("span");
  author.className = "repo-author";
  author.textContent = repo.owner.login;
  header.appendChild(author);

  const name = document.createElement("p");
  name.className = "repo-name";
  item.appendChild(name);

  const meta = document.createElement("div");
  meta.className = "repo-meta";
  item.appendChild(meta);

  if (repo.language) {
    const language = document.createElement("span");
    language.className = "repo-language";
    language.textContent = `${repo.language}`
    meta.appendChild(language);
  }

  const stars = document.createElement("span");
  stars.className = "repo-stars";
  stars.textContent = `★ ${repo.stargazers_count} `;
  meta.appendChild(stars);
  
  const nameLink = document.createElement("a");
  nameLink.href = repo.html_url;
  nameLink.target = "_blank";
  nameLink.rel = "noopener noreferrer";
  nameLink.textContent = `${repo.name} → Ver no GitHub`;
  nameLink.addEventListener("click", (event) => event.stopPropagation());
  name.appendChild(nameLink);
  
  if (repo.description) {
    const description = document.createElement("p");
    description.className = "repo-description";
    description.textContent = `${repo.description}`;
    item.appendChild(description);
  }

  return item;
}

// Busca informações detalhadas de um repositório específico e exibe em tela modal
async function showRepositoryDetails(repo) {
  modal.hidden = false;
  modalBody.innerHTML = '<p class="state-loading">Carregando detalhes...</p>';
  try {
    const response = await fetch(`https://api.github.com/repos/${repo.full_name}`);
    if (!response.ok) throw new Error("Não foi possível carregar os detalhes.");
    const details = await response.json();
   
    modalBody.replaceChildren();
    const title = document.createElement("h2"); 
    title.id = "modal-title"; 
    title.textContent = details.full_name;

    const description = document.createElement("p");
    description.className = "repo-description";
    description.textContent = details.description || "Sem descrição.";

    const stats = document.createElement("div");
    stats.className = "detail-stats";
    stats.textContent = `★ ${details.stargazers_count} · Forks ${details.forks_count} · Issues ${details.open_issues_count}`;

    const dates = document.createElement("p");
    dates.className = "detail-muted";
    dates.textContent = `Criado em ${new Date(details.created_at).toLocaleDateString("pt-BR")} · Atualizado em ${new Date(details.updated_at).toLocaleDateString("pt-BR")}`;
    
    const license = document.createElement("p");
    license.className = "detail-muted";
    license.textContent = `Licença: ${details.license?.name || "Não informada"}`;

    const topics = document.createElement("p");
    topics.className = "detail-muted";
    topics.textContent = `Tópicos: ${details.topics?.join(", ") || "Nenhum"}`;

    const links = document.createElement("p");
    links.className = "modal-links";
    links.innerHTML = `<a href="${details.html_url}" target="_blank" rel="noopener noreferrer">Abrir no GitHub</a>`;

    modalBody.append(title, description, stats, dates, license, topics, links);
  } catch (error) {modalBody.innerHTML = `<p class="state-error">${error.message}</p>`;}
}

// Configuração dos gatilhos para fechar o modal
function closeModal() {modal.hidden = true;}
document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {if (event.key === "Escape") closeModal();});