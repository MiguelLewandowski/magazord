Aplicação web para visualizar e filtrar repositórios de usuários do GitHub, desenvolvida como parte do teste técnico da Magazord.

Acesse a aplicação online: [Magazord GitHub Explorer](https://magazord-ou9c.vercel.app)

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação web que consome a API do GitHub para exibir informações de um usuário específico, incluindo seus repositórios e repositórios favoritados (starred). A aplicação permite alternar entre visualizações, filtrar por tipo e linguagem utilizada e pesquisar repositórios.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** 
- **React 19** 
- **TypeScript** 
- **Zustand** 
- **TanStack React Query** 
- **Tailwind CSS** 
- **React Icons**

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 20 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/MiguelLewandowski/magazord.git
   cd magazord
   ```

2. Instale as dependências:
   ```
   npm install
   # ou
   yarn install
   ```

3. Coloque o username do usuário do github que deseja buscar os dados no arquivo `src/app/page.tsx` na variavel 'username'.

4. Crie um arquivo .env.local na raiz do projeto, e configure um Token de acesso no github. Após isso coloque o seguinte código no .env.local: NEXT_PUBLIC_GITHUB_TOKEN='seu token'

4. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação em `http://localhost:3000`

## 🔍 Funcionalidades
- Visualização de dados do perfil do usuário (avatar, nome, bio, número de repositórios)
- Alternância entre visualização de repositórios e repositórios favoritados (starred)
- Filtragem de repositórios por:
- Tipo (todos, sources, forks, arquivados)
- Linguagem de programação
- Pesquisa por nome ou descrição de repositório
- Exibição de estatísticas de cada repositório (linguagem, stars, forks)

## 📝 Decisões de Implementação e principais desafios

### API do GitHub
Ao desenvolver este projeto, enfrentei o desafio da limitação da API do GitHub que retorna no máximo 100 repositórios por página. Para contornar isso, vi na doc https://docs.github.com/pt/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories que o padrão eram 30 repositórios por página e fiz com que em githubRepos.ts fizesse mais de uma requisição caso tivesse mais repositórios, e a cada requisição pegasse 100 repos por página que é o máximo.

Outro desafio foi que ao desenvolver ser o uso do token, pois achei que não iria precisar, ocorreu um erro ao desenvolver depois de algum tempo. O que descobri foi que o github limita as requisições sem autenticação por hora, então adicionei o 3 passo para que o usuário possa usar um token e assim não ter problemas com requisições.

### Desafios com o Next.js 15

Um dos principais desafios técnicos enfrentados neste projeto foi a compatibilidade com o Next.js 15, versão recente e com algumas mudanças significativas em relação às versões anteriores. Particularmente, foi necessário lidar com a tipagem dos parâmetros de página (`params` e `searchParams`) sofreu mudanças importantes no Next.js 15, onde agora são tratados como `Promise` e requerem await para serem acessados onde acabei demorando um tempo para estudar sobre o erro nas documentações.

### Desafio com Zustand para Gerenciamento de Estado

Outro desafio foi a implementação do Zustand para gerenciamento de estado, uma biblioteca que eu nunca havia utilizado antes.A abordagem mais minimalista do Zustand exigiu uma adaptação na forma de pensar o gerenciamento de estado mas acabou sendo muito interessante e tranquila de aprender.

Com o Zustand, aprendi a criar stores com menos código, aproveitar a integração direta com hooks do React e implementar filtros de forma simples e eficiente sem a necessidade de estruturas complexas.

#### Fontes de Documentação

Para resolver os desafios, consultei as seguintes fontes:

- [Documentação do Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Documentação do React Query](https://tanstack.com/query/latest/docs/react/overview)
- [Documentação do Tailwind](https://tailwindcss.com/docs)
- [Documentação oficial do Next.js](https://nextjs.org/docs)
- [Blog do Next.js sobre a versão 15](https://nextjs.org/blog/next-15)
- [Referência de API para páginas e componentes do Next.js especialmente para o deploy sem erros](https://nextjs.org/docs/app/api-reference/file-conventions/page) e (https://github.com/vercel/next.js/discussions/71997)

### Componentes Reutilizáveis
Desenvolvi componentes isolados e reutilizáveis para facilitar a manutenção e possibilitar futuras expansões da aplicação, como a inclusão de novas visualizações ou filtros.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, aprofundei meus conhecimentos em:
- Uso do React Query para gerenciamento de estado do servidor
- Implementação de filtragem complexa em tempo real
- Organização de código em uma aplicação Next.js
- Gerenciamento de estado global com Zustand
- Adaptação a mudanças em APIs do Next.js (especialmente na versão 15.2.3)

## 🚀 Melhorias Futuras

Embora o projeto atenda aos requisitos propostos, existem várias oportunidades de aprimoramento que poderiam ser implementadas:

- Adicionar virtualização para listas longas de repositórios usando `react-window` ou `react-virtualized`
- Expandir a visualização de detalhes de repositório para incluir contribuidores, pull requests, etc.
- Adicionar recursos de análise como gráficos de atividade e estatísticas de commits
- Implementar testes unitários 
- Implementar memoização com `useMemo` para otimizar renderizações de componentes com cálculos intensivos


---

Desenvolvido por [Miguel Lewandowski](https://github.com/MiguelLewandowski) como teste técnico para Magazord.