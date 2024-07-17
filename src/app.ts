import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { endpointV1 } from "./constants";
import { authRoutesV1, tokenRoutesV1 } from "./routes";
import { ErrorHandler } from "./middlewares";
import { IUser } from "./models";

// Extend the Express Request interface to include user property of type IUser
declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}

/*
 * Create an Express application instance
 */
const app: Application = express();

// Middlewares ==>

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

/*
 * Set Body parser
 * express().json() To parse JSON data in the req.body
 * express().urlencoded() To parse Form data in the req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To set and get cookies
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. 
| Prefix the routes with the version endpoint (e.g., "/api/v1").
| Make something great!
|
*/
app.use(endpointV1 + "/auth", authRoutesV1);
app.use(endpointV1 + "/token", tokenRoutesV1);

/*
 * Define a route for the root path ("/")
 * using the HTTP GET method to check if the server is running
 */
app.get("/", (_req: Request, res: Response) => {
    res.send("server is running");
});

// Middleware to handle errors in the application
app.use(ErrorHandler);

// Export the Express application instance for use in other modules
export default app;
