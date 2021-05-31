import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session'
import passportMiddleware from './middlewares/passportSQL';
import articulosRoutes from './routes/articulos.routes';
import usariosRoutes from './routes/usuarios.routes';
import adminRoutes from './routes/admin.routes'
import connection from './dbmongodatabase';
const app = express();
const MongoStore = require("connect-mongo")(session);
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});
app.set('port', 3000);

// middlewares 
app.use(morgan('dev'));
app.use(cors({origin: "http://localhost:4200"}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(
  session({
    secret:'sesionSecreta',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

//routes 
app.use(articulosRoutes);
app.use(usariosRoutes);
app.use(adminRoutes);

app.use(function(req,res,next){
    var err = new Error('Not found');
    res.status(404);
    next(err);
});
export default app;