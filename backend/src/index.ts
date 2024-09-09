import app from './app'; // Import the app created in app.ts

const port = process.env.PORT || 3000; // Get port from environment variables or use default

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});