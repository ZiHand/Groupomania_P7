const express                   = require('express');
const cookieParser              = require('cookie-parser');
const routes                    = require('./routes/user_routes');
const db                        = require('../config/db');
const {checkUser, requireAuth}  = require('./middlewares/auth_middleware');
const cors                      = require('cors');

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
const corsOptions = 
{
    origin: "http://localhost:3000",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));

// ===================================================
//                 Auth Definitions
// ===================================================
// Apply for all get routes
// ===================================================
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) =>
{
    console.log(res);
    res.status(200).send(res.locals.user.id);
});

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