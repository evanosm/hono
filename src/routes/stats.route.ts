import { Hono } from "hono";
import sql from "../../utils/db";

import { bearerAuth } from 'hono/bearer-auth';

const stats = new Hono();

stats.use('/', bearerAuth({ token: process.env.API_TOKEN } as any))

stats
    .get('/countProjects', async (c) => {
        const count = await sql`SELECT COUNT(*) FROM projects`;
        c.status(200);
        return c.json(count);
    })

export default stats;