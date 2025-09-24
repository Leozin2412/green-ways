import dotenv from 'dotenv';
dotenv.config();

const config={
    host: process.env.HOST || 3000,
    port: process.env.PORT || 'localhost',
}

export default config