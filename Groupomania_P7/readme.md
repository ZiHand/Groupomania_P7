### Groupomania Private Social Network

### React / Redux / Express / mySql / Sass

### =================== Git Adress =======================

https://github.com/ZiHand/Groupomania_P7.git

### ===================== BACKEND ========================

# Backend config:

- installer mySql & mysql workench selon votre OS
- Importer le fichier SQL `Groupomania.sql` fourni dans le zip

- Créez un fichier `.env` dans `/backend/config/` avec les données suivantes
  - PORT=8080 `votre PORT localhost (a éditer au besoin dans le frontend egalement)`
  - DB_USER='root' `votre login`
  - DB_PASS='the_password' `votre password`
  - TOKEN_SECRET=blablabla `votre clé secrète`
  - REACT_ADMIN_SECRET=the_admin_key_2022 `votre clé secrète pour les moderateurs (peut etre changée a tout moment, veulliez la communiquer a vos nouveaux moderateurs)`

# Backend install:

cd ./backend
npm install

# Backend start:

cd ./backend `if needed`
npm start

### ==================== FRONTEND ========================

# Frontend install:

- Copier le dossier "uploads" (Fourni dans le fichier zip) a la racine de `/frontend/public/`
- Créez ou adapter le fichier `.env` a la racine de `/frontend/` avec les données suivantes:
  - REACT_APP_API_URL=http://localhost:8080/ `meme PORT que pour le backend, voir ci dessus`

cd ./frontend
npm install

# Frontend start:

cd ./frontend `if needed`
npm start
