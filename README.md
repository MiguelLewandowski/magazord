Aplicação web para visualizar e filtrar repositórios de usuários do GitHub, desenvolvida como parte do teste técnico da Magazord.

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
   git clone https://github.com/seu-usuario/magazord.git
   cd magazord
   ```

2. Instale as dependências:
   ```
   npm install
   # ou
   yarn install
   ```

3. Coloque o username do usuário do github que deseja buscar os dados no arquivo `src/app/page.tsx` na variavel 'username'.

4. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação em `http://localhost:3000`


## 🧩 Decisões de Arquitetura

### Estrutura de Pastas
- **Feature-based**: Organizei o código separando por recurso/funcionalidade, facilitando a manutenção e escalabilidade.

## 🔍 Funcionalidades
- Visualização de dados do perfil do usuário (avatar, nome, bio, número de repositórios)
- Alternância entre visualização de repositórios e repositórios favoritados (starred)
- Filtragem de repositórios por:
  - Tipo (todos, sources, forks, arquivados)
  - Linguagem de programação
- Pesquisa por nome ou descrição de repositório
- Exibição de estatísticas de cada repositório (linguagem, stars, forks)

## 📝 Decisões de Implementação

### API do GitHub
Ao desenvolver este projeto, enfrentei o desafio da limitação da API do GitHub que retorna no máximo 100 repositórios por página. Para contornar isso, vi na doc https://docs.github.com/pt/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories que o padrão eram 30 repositórios por página e fiz com que em githubRepos.ts fizesse mais de uma requisição caso tivesse mais repositórios, e a cada requisição pegasse 100 repos por página que é o máximo.

### Componentes Reutilizáveis
Desenvolvi componentes isolados e reutilizáveis para facilitar a manutenção e possibilitar futuras expansões da aplicação, como a inclusão de novas visualizações ou filtros.

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, aprofundei meus conhecimentos em:
- Uso do React Query para gerenciamento de estado do servidor
- Implementação de filtragem complexa em tempo real
- Organização de código em uma aplicação Next.js
- Gerenciamento de estado global com Zustand

---

Desenvolvido por [Miguel Lewandowski](https://github.com/MiguelLewandowski) como teste técnico para Magazord.