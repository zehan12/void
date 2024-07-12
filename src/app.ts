import express, { Express, Request, Response } from "express";

/*
 * Create an Express application and get the
 */
const app: Express = express();

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});


export default app;
