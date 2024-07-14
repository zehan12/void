import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";

/*
 * Create an Express application and get the
 */
const app: Express = express();

// Middlewares ==>

/*
 * Set Body parser
 * express().json() To parse JSON data in the req.body
 * express().urlencoded() To parse Form data in the req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To set and get cookies
app.use(cookieParser());

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
    res.send("server is running");
});

export default app;
