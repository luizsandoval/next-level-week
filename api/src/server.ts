import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import cors from 'cors';

import Routes from './routes'; 

const dotenv = config();

if (dotenv.error) throw new Error('Error while configuring dotenv');
 
const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
