import "reflect-metadata";
import express from "express";
import {AppDataSource} from "./ormconfig"; // Your TypeORM config file
import scheinRoutes from "./routes/ScheinRoutes"; // Your route files
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your production frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database and start the server
AppDataSource.initialize().then(() => {
  console.log('Database connected');

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});

// Routes
app.use('/api', scheinRoutes);

export default app;