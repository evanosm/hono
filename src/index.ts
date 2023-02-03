// import
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/serve-static.bun";

// routes
import projects from "./routes/projects.route";
import stats from "./routes/stats.route";

// constants
const port = parseInt(process.env.PORT) || 3000;
const app = new Hono();

//CORS
app.use('/projects/*', cors({
	origin: '*',
	allowMethods: ['GET'],
}))

//Middleware
app.use("*", async (c, next) => {
	if (c.req.param("id")) {
		console.log(
			`${c.req.method} ${c.req.url}| (at ${new Date().toLocaleString()}))`,
		);
		console.log(
			`🪄 - See on website at: https://www.vean.fr/projects/${c.req.param(
				"id",
			)}`,
		);
	} else {
		console.log(
			`${c.req.method} ${c.req.url} | (at ${new Date().toLocaleString()}))`,
		);
	}
	await next();
});

//Routes
app.route("/projects", projects);
app.route("/stats", stats);

//Serve app
console.log(`------------------------------------`);
console.log(`Running at http://localhost:${port}, press CTRL+C to stop`);
console.log(`Launched at ${new Date().toLocaleString()}`);
console.log(`------------------------------------`);

export default {
	port,
	fetch: app.fetch,
};
