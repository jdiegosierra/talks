* Instalar librerias:
npm install


* Iniciar la app:
npm start


* Endpoints:
Los endpoints están definidos en ./Code/app/routes

http://localhost:3000/api/v1/keys (Administración de claves asimétricas. Necesita MongoDB)

http://localhost:3000/api/v1/blockchain (Administra la blockchain. Necesita Docker. La primera vez que se inicia puede tardar hasta 5 minutos)

http://localhost:3000/api/v1/entities (Administra las entidades (en la charla los llamamos activos).)
