const express       = require('express');
const cookieParser  = require('cookie-parser');
const routes        = require('./routes/user_routes');
const db            = require('../config/db');
const {checkUser}   = require('./middlewares/auth_middleware');

// ===================================================
//                 Express App Creation
// ===================================================
const app = express();

// Ici, Express prend toutes les requêtes qui ont comme Content-Type  application/json  
// et met à disposition leur  body  directement sur l'objet req
app.use(express.json());
app.use(cookieParser());

// ===================================================
//                     Middlewares
// ===================================================

// ===================================================
// le middleware ne prend pas d'adresse en premier paramètre, 
// afin de s'appliquer à toutes les routes. 
// Cela permettra à toutes les demandes de toutes les origines d'accéder à l' API.
// ===================================================
app.use((req, res, next) => 
{
    // accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ===================================================
//                 Auth Definitions
// ===================================================
// Apply for all get routes
// ===================================================
app.get('*', checkUser);

// ===================================================
//                 Routes Definitions
// ===================================================
app.use('/api/user', routes);

// ===================================================
//                 DB Connection
// ===================================================
db.sync()
    .then(() =>
    {
        console.log("Connection to Groupomania DB OK.");
    })
    .catch(error => console.log("Connection to Groupomania FAILED : " + JSON.stringify(error)));

// ===================================================
//                     Export
// ===================================================
module.exports = app;