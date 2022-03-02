### Groupomania Private Social Network

### React / Redux / Express / mySql

### ===================== BACKEND ========================

# Backend config:

- Mettez vos informations dans `/backend/config/db.js`
- Créez le fichier `.env` dans `/backend/config/` dans les données suivantes
  - PORT=8080 `votre port localhost`
  - DB_USER='the_user' `votre login`
  - DB_PASS='the_password' `votre password`
  - TOKEN_SECRET=blablabla `votre clé secrète`
  - MODERATOR_SECRET_KEY=blablabla `votre clé secrète pour les moderateurs (peut etre changée a tout moment, veulliez la communiquer a vos nouveaux moderateurs)`

# Backend install:

cd ./backend
npm install

# Backend start:

cd ./backend `if needed`
nodemon server

### ==================== FRONTEND ========================

# Frontend install:

cd ./frontend
npm install

# Frontend start:

cd ./frontend `if needed`
npm start
