# PRD — Buscador de Repositórios no GitHub

O objeitvo é criar uma aplicação web simples, responsiva e visualmente limpa para buscar repositórios no GitHub por palavras-chaves (linguagem e usuário) e exibir os resultados de forma organizada.

### Funcionalidades
1. Consulta por palavra-chave:
    - O usuário digita um termo no campo de busca, seja a linguagem ou o usuário, mas ambos ou pelo menos um precisa ser preenchido para realizar a consulta.
    - A busca é iniciada somente ao pressionar Enter.
    - A aplicação consulta a API do GitHub e exibe os repositórios encontrados.

2. Exibição de resultados da busca por repositório:
    - Para cada repositório retornado, a interface deve mostrar:
      - Foto e nome do autor;
      - Nome do repositório;
      - Os 200 primeiros caráteres da descrição;
      - E, a linguagem principal utilizada.

3. Página de detalhes do repositório:
    - Ao clicar em um resultado, abrir pop-up com os dados do item 2, e mais os seguintes dados: estrelas, forks, issues, data de criação e da última atualização, licença, tópicos, link direto para o repositório e o readme.

4. Exibição de resultados da busca por usuário:
    - Para cada repositório retornado, a interface deve mostrar: avatar, nome, bio, localização, quantidade de seguidores e seguindo, número de repositórios, site e principais linguagens.

5. Estados da interface
    - Loading: mostrar um estado de carregamento enquanto a busca estiver em andamento.
    - Empty state: exibir uma mensagem quando não houver resultados.
    - Error state: exibir uma mensagem amigável em caso de erro na requisição.

### Decisões técnicas
1. Integração com a API do GitHub
    - Endpoint utilizado:
  https://api.github.com/search/repositories?q={PALAVRA-CHAVE}&sort=stars&per_page=10
    - A palavra-chave (lingaguem ou usuário) digitada pelo usuário deve substituir o marcador da URL.
    - Os resultados devem vir ordenados por última data de alteração/atualização e limitados a 10 itens.
    - Ao final do resultado, colocar páginação com a opção de mudar o número da página manualmente.

2. Requisição HTTP
    - A requisição deve ser feita com fetch.
    - O fluxo deve usar async/await com try/catch.
    - O status da resposta deve ser verificado antes de processar os dados.

3. Estrutura de eventos
    - Todos os eventos devem ser definidos no JavaScript.
    - Não devem existir eventos inline no HTML, como onclick ou onkeydown.

4. Padrão visual adotado
    - O visual deve seguir as diretrizes do arquivo /plans/braindump-base;
