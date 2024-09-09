import express from 'express';
import dataSource from './ormconfig'
import scheinRoutes from './routes/scheinRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', scheinRoutes);

// Initialize the database and start the server
dataSource.initialize().then(() => {
  console.log('Database connected');

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});

export default app;