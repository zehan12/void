import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { endpointV1 } from "./constants";
import { authRoutesV1 } from "./routes";
import { ErrorHandler } from "./middlewares/errorHandler";
import { IUser } from "./models";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}

/*
 * Create an Express application and get the
 */
const app: Application = express();

// Middlewares ==>

app.use(cors())

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
| Make something great!
|
*/
app.use(endpointV1 + "/auth", authRoutesV1);

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (_req: Request, res: Response) => {
    res.send("server is running");
});

// Error Handling
app.use(ErrorHandler);

export default app;
