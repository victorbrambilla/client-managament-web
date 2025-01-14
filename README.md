# Client Management

Este é um projeto de gerenciamento de clientes desenvolvido com Angular e AWS Amplify para autenticação.

## Requisitos

- Node.js
- Angular CLI
- AWS Amplify

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/client-management.git
    cd client-management
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Configure o AWS Amplify com suas credenciais:
    ```sh
    amplify configure
    ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:
```sh
npm start
```

O aplicativo estará disponível em `http://localhost:4200`.

## Estrutura do Projeto

- `src/app/features/auth`: Contém os componentes e serviços de autenticação.
- `src/app/features/auth/login`: Componente de login.
- `src/app/features/auth/auth.service.ts`: Serviço de autenticação.
- `src/app/features/auth/auth.interceptor.ts`: Interceptor para adicionar o token JWT às requisições.
- `src/app/features/auth/auth.guard.ts`: Guarda de rota para proteger rotas autenticadas.

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o aplicativo para produção.
- `npm test`: Executa os testes unitários.

## Dependências

- Angular
- AWS Amplify
- RxJS

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
 