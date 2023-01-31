import { Hono } from "hono";
import sql from "../../utils/db";
import { Project } from "../models/project.model";

import { v4 as uuidv4 } from "uuid";

const projects = new Hono();

projects
	.get("/", async (c) => {
		return sql`SELECT * FROM projects`.then((projects) => {
			return c.json(projects);
		});
	})
	.post("/", async (c) => {
		const project = (await c.req.json()) as Project;
		project.id = uuidv4();
		console.log(project?.desc);
		return sql`INSERT INTO projects ("id", "name", "type", "desc", "year", "role", "image", "isFreelance", "isFeatured", "url") VALUES (${project.id}, ${project.name}, ${project.type}, ${project.desc}, ${project.year}, ${project.role}, ${project.image}, ${project.isFreelance}, ${project.isFeatured}, ${project.url})`.then(
			(project) => {
				return c.json(project);
			},
		);
	})
	.delete("/:id", async (c) => {
		const id = c.req.param("id");
		const project = await sql`DELETE FROM projects WHERE id = ${id}`;
		if (!project) {
			return c.json({ message: "Project not found" });
		}
		return c.json(project);
	})
	.put("/:id", async (c) => {
		const id = c.req.param("id");
		const project = (await c.req.json()) as Project;
		const projectToUpdate = await sql`SELECT * FROM projects WHERE id = ${id}`;
		if (!projectToUpdate) {
			return c.json({ message: "Project not found" });
		}

		project.name = project.name || projectToUpdate.name;
		project.type = project.type || projectToUpdate.type;
		project.desc = project.desc || projectToUpdate.desc;
		project.year = project.year || projectToUpdate.year;
		project.role = project.role || projectToUpdate.role;
		project.image = project.image || projectToUpdate.image;
		project.isFreelance = project.isFreelance || projectToUpdate.isFreelance;
		project.isFeatured = project.isFeatured || projectToUpdate.isFeatured;
		project.url = project.url || projectToUpdate.url;

		const updatedProject =
			await sql`UPDATE projects SET name = ${project.name}, type = ${project.type}, desc = ${project.desc}, year = ${project.year}, role = ${project.role}, image = ${project.image}, isFreelance = ${project.isFreelance}, isFeatured = ${project.isFeatured}, url = ${project.url} WHERE id = ${id}`;
		return c.json(updatedProject);
	});

export default projects;
