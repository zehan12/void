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
export const startServer = async () => {
    const server = app.listen(PORT, () => {
        console.log(`
            ################################################
            🚀 Server listening on port: ${PORT} 🚀
            ################################################
        `);
    });

    // Make sure we are running node 18+
    const [major, minor] = process.versions.node.split(".").map(parseFloat);
    if (major < 16 || (major === 16 && minor <= 0)) {
        console.log(
            "Please go to nodejs.org and download version 18 or greater. 👌\n "
        );
        process.exit();
    }

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                console.log("Server closed");
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error: unknown) => {
        console.log(error);
        exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
        console.log("SIGTERM received");
        if (server) {
            server.close();
        }
    });
};

startServer().then(() => {
    console.log("server is up 🔥");
});
