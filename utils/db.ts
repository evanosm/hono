import postgres from 'postgres';

const sql = postgres(
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
);

const [{ version }] = await sql`SELECT version()`;
console.log(`----------------| API VEAN INIT |----------------`);
console.log(`PostgreSQL version: ${version}`);

export default sql;