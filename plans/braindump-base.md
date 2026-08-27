Este documento define os padrões globais (visuais) para o projetos deste repositório.
---

### 🧭 Direção visual
- Criar interfaces atuais, limpas, premium e fáceis de usar;
- Priorizar hierarquia visual, legibilidade e espaços em branco;
- Evitar excesso de elementos decorativos, sombras fortes, gradientes sem propósito ou animações chamativas;
- E, manter consistência visual entre botões, inputs, cards, títulos.

### 📐 Layout e responsividade
- O layout deve ser 100% responsivo, com abordagem mobile-first e boa hierarquia visual;
- A largura máxima do conteúdo principal deve ser: 1200px;
- Centralizar o conteúdo com margens laterais responsivas de: 5%;
- Usar espaçamentos consistentes, preferencialmente em múltiplos de: 4px;
- Evitar barras de rolagem horizontais;
- E, em telas menores, reorganizar grids, menus e ações sem esconder funcionalidades essenciais.

### 🎨 Cores
- Background principal: #F6F6F6`;
- Cor de destaque e CTAs: #2F4F4F;
- Texto principal com tom escuro com contraste adequado sobre o fundo;
- Textos secundários e elementos de apoio em tons de cinza, com: #808080;
- Usar branco para superfícies como cards, modais e campos quando isso melhorar a separação visual;
- Não usar cor como único indicador de estado, erro ou informação;
- E, garantir contraste suficiente entre texto, ícones e fundos.

### 🔤 Tipografia
- Fonte principal: Roboto, com fallback para: system-ui, sans-serif;
- Usar uma escala tipográfica consistente para títulos, subtítulos, corpo e textos auxiliares;
- Títulos devem ter hierarquia clara e não depender apenas de tamanho ou cor;
- Priorizar legibilidade e evitar textos pequenos demais, especialmente em dispositivos móveis;
- E, usar pesos tipográficos com moderação.

### 🧩 Componentes e interações
- Botões devem ter estados de hover, foco, ativo e desabilitado;
- Inputs devem possuir label visível, feedback de erro claro e estado de foco perceptível;
- Cards devem ter bordas, espaçamento e elevação discretos;
- Ações destrutivas devem ser visualmente diferenciadas das ações principais;
- E, estados vazios, carregamento e erros devem ser previstos quando fizer sentido.

### ✨ Animações
- Usar animações suaves e discretas, principalmente: fade, transições de opacidade, transformações pequenas e hover;
- Usar duração curta, normalmente entre: 150ms e 300ms.
- Não usar animações contínuas ou que prejudiquem leitura, foco ou desempenho;
- E, respeitar a preferência: prefers-reduced-motion.