import { configSchema } from "../zod";
import { Config } from "../types";
import { Secret } from "jsonwebtoken";

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
require("dotenv").config({ path: __dirname + "/../../.env" });

// Validate the environment variables using Zod
const configValidation = configSchema.safeParse(process.env);

if (!configValidation.success) {
    console.error("Invalid configuration:", configValidation.error.format());
    process.exit(1);
}

const config: Config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 4200,
    db: {
        url:
            process.env.NODE_ENV === "production"
                ? process.env.MONGO_URL
                : `mongodb://localhost:27017/${process.env.APP_NAME}`,
        password: process.env.DATABASE_PASSWORD,
    },
    jwt: {
        accessToken: {
            secret: process.env.ACCESS_TOKEN_SECRET as Secret,
            expiry: process.env.ACCESS_TOKEN_EXPIRY,
        },
        refreshToken: {
            secret: process.env.REFRESH_TOKEN_SECRET as Secret,
            expiry: process.env.REFRESH_TOKEN_EXPIRY,
        },
    },
};

export default config;
