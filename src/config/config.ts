/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 4200,
    db: {
        url:
            process.env.NODE_ENV === "production"
                ? process.env.MONGO_URL
                : `mongodb://localhost:27017/${process.env.APP_NAME}`,
        password: process.env.DATABASE_PASSWORD,
    },
};

export default config;
