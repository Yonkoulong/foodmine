import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const env = {
    PORT: process.env["PORT"],
    API_PORT: process.env["API_PORT"],
    DB_URL: process.env["DB_URL"],
}