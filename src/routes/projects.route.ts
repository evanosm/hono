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

		project.name === null || project.name === undefined ? (project.name = projectToUpdate[0].name) : project.name;
		project.type === null || project.type === undefined ? (project.type = projectToUpdate[0].type) : project.type;
		project.desc === null || project.desc === undefined ? (project.desc = projectToUpdate[0].desc) : project.desc;
		project.year === null || project.year === undefined ? (project.year = projectToUpdate[0].year) : project.year;
		project.role === null || project.role === undefined ? (project.role = projectToUpdate[0].role) : project.role;
		project.image === null || project.image === undefined ? (project.image = projectToUpdate[0].image) : project.image;
		project.isFreelance === null || project.isFreelance === undefined ? (project.isFreelance = projectToUpdate[0].isFreelance) : project.isFreelance;
		project.isFeatured === null || project.isFeatured === undefined ? (project.isFeatured = projectToUpdate[0].isFeatured) : project.isFeatured;
		project.url === null || project.url === undefined ? (project.url = projectToUpdate[0].url) : project.url;

		const updatedProject =
			await sql`UPDATE projects SET "name" = ${project.name}, "type" = ${project.type}, "desc" = ${project.desc}, "year" = ${project.year}, "role" = ${project.role}, "image" = ${project.image}, "isFreelance" = ${project.isFreelance}, "isFeatured" = ${project.isFeatured}, "url" = ${project.url} WHERE "id" = ${id}`;
		return c.json(updatedProject);
	});

export default projects;
