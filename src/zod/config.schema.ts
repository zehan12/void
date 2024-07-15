import { z } from "zod";

// Define the Zod schema for configuration validation
export const configSchema = z.object({
    NODE_ENV: z.string().nonempty(),
    PORT: z.string().nonempty().transform(Number).default("4200"),
    MONGO_URL: z.string().nonempty().optional(),
    APP_NAME: z.string().nonempty(),
    DATABASE_PASSWORD: z.string().nonempty(),
    ACCESS_TOKEN_SECRET: z.string().nonempty(),
    ACCESS_TOKEN_EXPIRY: z.string().nonempty(),
    REFRESH_TOKEN_SECRET: z.string().nonempty(),
    REFRESH_TOKEN_EXPIRY: z.string().nonempty(),
});
