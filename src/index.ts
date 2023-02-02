// import
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/serve-static.bun";

// routes
import projects from "./routes/projects.route";

// constants
const port = parseInt(process.env.PORT) || 3000;
const app = new Hono();
//CORS
app.use('/projects/*', cors({
	origin: '*',
	allowMethods: ['GET'],
}))

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

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

app.route("/projects", projects);

console.log(`------------------------------------`);
console.log(`Running at http://localhost:${port}, press CTRL+C to stop`);
console.log(`Launched at ${new Date().toLocaleString()}`);
console.log(`------------------------------------`);

export default {
	port,
	fetch: app.fetch,
};
