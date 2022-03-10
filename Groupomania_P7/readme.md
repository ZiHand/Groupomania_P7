### Groupomania Private Social Network

### React / Redux / Express / mySql

### ===================== BACKEND ========================

# Backend config:

- Mettez vos informations dans `/backend/config/db.js`
- Créez le fichier `.env` dans `/backend/config/` dans les données suivantes
  - PORT=8080 `votre port localhost`
  - DB_USER='root' `votre login`
  - DB_PASS='the_password' `votre password`
  - TOKEN_SECRET=blablabla `votre clé secrète`
  - REACT_ADMIN_SECRET=the_admin_key_2022 `votre clé secrète pour les moderateurs (peut etre changée a tout moment, veulliez la communiquer a vos nouveaux moderateurs)`

# Backend install:

- install mySql and mysql workench according to your OS
- import the provided sql file
- copy

cd ./backend
npm install

# Backend start:

cd ./backend `if needed`
npm start

### ==================== FRONTEND ========================

# Frontend install:

cd ./frontend
npm install

# Frontend start:

cd ./frontend `if needed`
npm start
