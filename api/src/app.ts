import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import articulosRoutes from './routes/articulos.routes';
import usariosRoutes from './routes/usuarios.routes';
const app = express();

app.set('port', 3000);

// middlewares 
app.use(morgan('dev'));
app.use(cors({origin: "http://localhost:4200"}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes 
app.use(articulosRoutes);
app.use(usariosRoutes);
export default app;