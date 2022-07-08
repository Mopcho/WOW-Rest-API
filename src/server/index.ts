import express from 'express';
import router from './routes';

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server listnening on port ${process.env.SERVER_PORT}`);
});
