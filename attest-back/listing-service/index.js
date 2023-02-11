import express from 'express';
import cors from 'cors';

const PORT = 8001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

const router = express.Router();

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'));


app.use('/api/listing', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

// await connectToRedis();

app.listen(PORT, () => console.log(`listing-service listening on port ${PORT}`));

export default app;