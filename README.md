# BeTalent

### Sobre o projeto
Este projeto foi desenvolvido como parte do teste prático para a vaga de Desenvolvedor(a) Front-end na BeTalent. Consiste em uma aplicação responsiva que exibe uma tabela de colaboradores com funcionalidade de pesquisa, consumindo dados de uma API simulada.


O design foi disponibilizado no Figma, e você pode conferi-lo [aqui](https://www.figma.com/design/yw6th52zE9bubewc6ayTg5/Teste-T%C3%A9cnico-Frontend-BeTalent?node-id=5433-121&t=nP4H0C2fogY647pP-0).


## :computer: Tecnologias

- [React](https://legacy.reactjs.org/docs/create-a-new-react-app.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [Json Server](https://www.npmjs.com/package/json-server)


### 🎯 Funcionalidades

- Visualização de tabela com dados de funcionários
- Pesquisa dinâmica por nome, cargo e telefone
- Formatação de datas e telefones no front-end
- Layout responsivo (adaptado para desktop e mobile)
- Tratamento de estados de carregamento e erro

### ➕ Funcionalidade Adicional

- Adição do novo funcionário diretamente no db.json
- Atualização automática da tabela após o cadastro

---
### 🚀 Como Rodar o Projeto

1. **Clone o repositório**:

```bash
git clone git@github.com:marcellypereira/BeTalent.git
cd BeTalent
```

2. **Crie um arquivo .env na raiz do projeto e adicione**:

```bash
VITE_API_URL=http://localhost:3000
```

3. **Instale as dependências**:

```bash
yarn install
```

4. **Instale o Json Server globalmente (caso não tenha)**:

```bash
yarn install -g json-server
```
5. **Inicie o Json Server em um terminal separado**:

```bash
json-server --watch db.json --port 3000
```
6. **Inicie a aplicação**:

```bash
npm run dev
```

## :sparkles: Visualização Desktop

![desktop](https://github.com/user-attachments/assets/2207e621-4cd1-4cf2-8623-bd6fdd9fae1e)

## :sparkles: Visualização Mobile

![mobile](https://github.com/user-attachments/assets/89f3617f-2ef8-4f2e-95b4-52fd25d6e8fb)

<div align="center">Feito com 💜! </div>
