// import
import { Hono } from "hono";
import { serveStatic } from 'hono/serve-static.bun';

// routes
import projects from './routes/projects.route';

// constants
const port = parseInt(process.env.PORT) || 3000;
const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));

app.route('/projects', projects);

app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});


console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
