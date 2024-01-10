import express from 'express';
import ClientRouter from './clientRouter.js';
import startServer from './server.js';
import cors from 'cors'
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = 12345;
app.use(cors());


app.use(express.json());
app.use('/client',ClientRouter)


async function start(){
await app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

await startServer()

} 
start()

