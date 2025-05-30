# Products API

Este projeto tem como objetivo gerenciar produtos e marcas, oferecendo funcionalidades de criação e listagem de produtos, bem como gerenciamento de marcas associadas.

## Arquitetura

A aplicação é construída com Node.js, utilizando:

- **Prisma** para gerenciamento de banco de dados.
- **Fastify** como servidor web.
- **TypeScript** para garantir tipagem estática e desenvolvimento mais seguro.

## Requisitos

- Node.js 20
- npm (gerenciador de pacotes)
- Prisma para interação com o banco de dados
- Docker (para rodar o banco de dados localmente)

## Como Rodar o Projeto Localmente

1. **Clonar o repositório**

```bash
git clone https://github.com/joaoguzela/Products-api.git
cd products_api
```

2. **Instalar as dependências**

```bash
npm install
```

3. **Configurar o banco de dados**

Certifique-se de que o banco de dados esteja configurado corretamente no arquivo `.env`. Se for necessário, use o Docker Compose para rodar o banco de dados:

```bash
docker-compose up
```

4. **Executar as migrações**

```bash
npx prisma migrate dev
```

5. **Rodar o Seed para criar dados de exemplo**

```bash
npx prisma db seed
```

6. **Iniciar o servidor**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

| Rota        | Método | Descrição                  | Status |
| ----------- | ------ | -------------------------- | ------ |
| `/products` | POST   | Criação de um novo produto | ✅ OK  |
| `/products` | GET    | Listagem de produtos       | ✅ OK  |
| `/brands`   | GET    | Listagem de marcas         | ✅ OK  |
| `/login`    | POST   | Login                      | ✅ OK  |

## Postman Collection

Você pode importar a **Postman Collection** com todos os endpoints configurados para facilitar os testes da API. O JSON para importação no postman esta na raiz do projeto

## Observações

- **A integração depende da configuração correta** do banco de dados e dos dados de exemplo no seed.
- **Para rodar no Docker**, use o comando `docker-compose up` para garantir que o banco de dados seja executado corretamente.
