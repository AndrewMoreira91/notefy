
# Notefy

Notefy é uma aplicação full-stack para gerenciar suas notas de forma simples e eficiente

Este repositório contém o código fonte completo da aplicação Notefy, tanto o backend quanto o frontend.

## Demo

https://notefynote.netlify.app/

## Tecnologias Utilizadas

**Frontend:** React, Vite

**Server:** Node.js, TypeScript, Express, Prisma ORM, PostgreSQL

### Pré-requisitos
* **Node.js:** Instale a versão LTS mais recente em https://nodejs.org/
* **Docker:** Instale o Docker Desktop para sua plataforma em https://www.docker.com/get-started/
### Configuração
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AndrewMoreira91/notefy.git
### Configuração do Backend:

Copie o arquivo .env.example para .env e preencha o valor de JWT_SECRET com um ID único.





### Rodando o backend localmente

No terminal mude para o diretorio do servidor

```bash
  cd server
```

Certifique-se de que o Docker está rodando, e inicie o backend.

```bash
  docker-compose up
```



### Configuração do frontend:

Copie o arquivo .env.example para .env e preencha o valor de REACT_APP_API_URL com a URL do seu backend (ex: http://localhost:3333)

### Rodando o frontend localmente

No terminal mude para o diretorio do frontend

```bash
  cd web
```

Instale as dependencias
```bash
  npm install
```

Rode o frontend
```bash
  npm run dev
```


## Autor

- [@AndrewMoreira91](https://github.com/AndrewMoreira91)

