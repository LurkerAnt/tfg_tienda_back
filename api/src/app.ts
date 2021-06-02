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
const app = express();
const MongoStore = require("connect-mongo");
/*const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
})*/

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
    secret: "sesionSecreta",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/tienda",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

//routes 
app.use(articulosRoutes);
app.use(usariosRoutes);
app.use(adminRoutes);

app.use(function(req,res,next){
    var err = new Error('Error 404 Not found');
    res.status(404);
    next(err);
});
export default app;