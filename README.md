# 🔀 Repofly
Aplicação web estática para pesquisar repositórios do GitHub por termo, nome de usuário ou pela combinação dos dois critérios.

### 🛠️ Funcionalidades
- Busca automática enquanto o usuário digita, com atraso de 450 ms para evitar requisições consecutivas.
- Pesquisa por linguagem, nome, assunto ou qualquer outro termo aceito pela busca de repositórios do GitHub.
- Filtro opcional por usuário do GitHub.
- Ordenação dos resultados por número de estrelas.
- Paginação com navegação anterior/próxima e entrada direta do número da página.
- Exibição de avatar, autor, nome, descrição, linguagem e estrelas de cada repositório.
- Modal com detalhes adicionais, incluindo forks, issues abertas, datas, licença e tópicos.
- Abertura dos repositórios diretamente no GitHub.

### 📚 Como usar?

1. Digite um termo no campo **Termo**, um usuário no campo **Nome do usuário**, ou preencha os dois.
2. Aguarde a busca automática.
3. Selecione um repositório para abrir seus detalhes.
4. Use os controles de paginação para consultar outras páginas de resultados.

Quando os dois campos são preenchidos, a busca usa o formato `termo user:usuario` da API do GitHub. Quando apenas o usuário é informado, a consulta usa `user:usuario`.

### 💻 Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript puro
- GitHub REST API

## 🔍 Observações API do GitHub
A aplicação utiliza os endpoints públicos da API do GitHub:

- `GET /search/repositories` para listar repositórios.
- `GET /repos/{owner}/{repo}` para carregar os detalhes de um repositório.

As requisições não usam autenticação. Por isso, estão sujeitas ao limite de requisições da API pública do GitHub. A interface informa quando esse limite é atingido.

A API permite no máximo 1.000 resultados navegáveis por busca; a aplicação calcula a paginação respeitando esse limite.

O conteúdo exibido depende da disponibilidade e das respostas da API do GitHub e o projeto, no momento, não possui backend, banco de dados ou armazenamento local.

```text
📁 Estrutura

.
├── plans
│ ├── braindump-base.md
│ ├── braind.md
│ └── prd.md
├── index.html   # Estrutura da página e do modal
├── script.js    # Busca, paginação e interação com a API
└── style.css    # Layout, estados visuais e responsividade
```