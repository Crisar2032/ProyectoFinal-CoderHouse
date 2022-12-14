import express from 'express';
import morgan from 'morgan';
import router from './routes';
const app = express();



app.use(morgan('dev'));
app.use(express.json());

app.use('/',router);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => { console.log(`Server runing and listening on port ${PORT}`) });
server.on('error', (error:any) => console.log(`Error ${error}`));
