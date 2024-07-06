import app from "./app";
import dotenv from "dotenv";

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * value of the PORT environment variable
 * from the `process.env`
 */
const PORT = process.env.PORT || 3000;

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(PORT, () => {
    console.log(`[server]: Server is running on port:${PORT}`);
});
