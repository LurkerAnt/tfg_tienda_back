import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import articulosRoutes from './routes/articulos.routes'
const app = express()

app.set('port', 3000);


app.use(morgan('dev'));
app.use(cors({origin: "http://localhost:4200"}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(articulosRoutes);

export default app;