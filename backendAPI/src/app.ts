import "reflect-metadata";
import express from "express";
import {AppDataSource} from "./ormconfig"; // Your TypeORM config file
import scheinRoutes from "./routes/ScheinRoutes"; // Your route files

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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