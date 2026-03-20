import express from 'express';
import 'dotenv/config';
import connectDB from './db/connection.js';
import bookRoutes from './routes/bookRoutes.js'


const app = express();
const port = 3001;

connectDB();

app.use(express.json());
app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
