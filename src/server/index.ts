import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes';
import cors from 'cors';

require('dotenv').config();

const app = express();

//Setup cookieParser and public folder
app.use(cookieParser());
app.use(express.static('public'));

app.use(cors);

//Setup bodyParser
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server listnening on port ${process.env.SERVER_PORT}`);
});
