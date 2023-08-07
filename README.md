# Boas-vindas ao projeto Store Manager!


## Descrição
Foi desenvolvido uma API utilizando a arquitetura MSC (model-service-controller) e interface RESTful. A API é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.


## Nesse projeto, foi utilizado:

  * Node.js com Express
  * Joi para validações
  * MySQL para gestão de dados
  * Mocha, Chai e Sinon para testes

# Orientações

<details>
  <summary><strong>:whale: Rodando a aplicação no Docker</strong></summary> 
 
 
  ---
 
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui]     (https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação]     (https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
 
 > :information_source: Clone o projeto com o comando `git clone ***`.
 
 > :information_source: Entre na pasta `cd projeto-store-manager`.
 
 > :information_source: Rode os serviços node e db com o comando `docker-compose up -d`.
   - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
   - Esses serviços irão inicializar um container chamado `store_manager` e outro chamado `store_manager_db`;
   - A partir daqui você pode rodar o container `store_manager` via CLI ou abri-lo no VS Code.
 
 >  :information_source: Use o comando `docker exec -it store_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose.
 
 > :information_source: Instale as dependências com `npm install`
 
  - **:warning: Atenção:** **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.
 
 - **:warning: Atenção:** Se você se deparar com o erro abaixo, quer dizer que sua aplicação já esta utilizando a `porta 3000`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop containerName`.
 
 <img width="769" alt="erroDePorta" src="https://user-images.githubusercontent.com/98190059/224819449-597a1b30-8501-4edc-a498-52f9507fbd61.png">
 
 - ✨ **Dica:** Antes de iniciar qualquer coisa, observe se os containers estão em execução em sua máquina.
 
  >  :information_source: Use o comando `npm run migration`.
  - Ele criará o banco de dados com as tabelas.
 
  >  :information_source: Use o comando `npm run seed`.
  - Para popular o banco de dados.
 
  >  :information_source: Use o comando `npm start`.
  - Ele inicializará a aplicação, deve aparecer a mensagem "Escutando na porta 3000" como na imagem abaixo.
 
 ![Screenshot from 2023-03-13 17-23-03](https://user-images.githubusercontent.com/98190059/224823854-bed3670b-b9ce-420b-9300-664c6cc9a120.png)
 
</details>

##

<details>
 <summary><strong>💥:Utilizando a aplicação</strong></summary>
  As rotas disponíveis são:
 
 ### Post
 * Cadastrar uma venda: `http://localhost:3000/sales`
   - **:warning:** É esperado um array de objetos no body da requisição do tipo:
       ```JSON
       [
         {
           "productId": 1, //ID do produto
           "quantity":1 //Quantidade vendida
         },
        ]
        ```
 * Cadastrar um produto: `http://localhost:3000/products/`
    - **:warning:** É esperado um objeto no body da requisição do tipo:
      ```JSON
        {
          "name": "produto", //Nome do produto
        }
       ```
 
 ### Get
 * Listar todos os produtos: `http://localhost:3000/products/`
 * Listar todas as vendas: `http://localhost:3000/sales`
 * Procurar um produto pelo ID: `http://localhost:3000/products/ID`
 
 ### Put
 * Alterar o nome de um produto pelo ID: `http://localhost:3000/products/ID`

</details>




