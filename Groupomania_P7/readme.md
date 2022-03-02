---
### Groupomania Private Social Network
# React / Redux / Express / mySql
---

### ===================== BACKEND ========================

# Backend config:

- Mettez vos informations dans `/backend/config/db.js`
- Créez le fichier `.env` dans `/backend/config/` dans les données suivantes
  - PORT=8080 `votre port localhost`
  - DB_USER='the_user' `votre login`
  - DB_PASS='the_password' `votre password`
  - TOKEN_SECRET=990bf68e6adf1be5f1671bba3bec692056922454 `votre clé secrète`
  - MODERATOR_SECRET_KEY=81e844b3-2d93-4f29-98a3-f5b9c18d6b91 `votre clé secrète pour les moderateurs (peut etre changée a tout moment, veulliez la communiquer a vos nouveaux moderateurs)`

cd ./backend
npm install

# Backend start:

nodemon server

### ==================== FRONTEND ========================

cd ./frontend
npm install
npm start
