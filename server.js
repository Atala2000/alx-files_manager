import express from 'express';
import controllerRouting from './routes/index';

const app = express();
/**
 * The port number for the server.
 * @type {number}
 */
const port = process.env.PORT || 5000;

app.use(express.json());

controllerRouting(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
