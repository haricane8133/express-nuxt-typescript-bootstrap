import express from "express";
import consola from "consola";
const { Nuxt, Builder } = require('nuxt');
import path = require("path");
import {httpClient} from "./modules/http";
import * as fs from "fs-extra";
import { request } from "http";

const app: express.Application = express();

/**
 * Un Comment out the following according to requirements
 * NOTE:- each of these get fired up depending upon the header of the request
 */
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../static')));

/**
 * This is for enabling CORS in the server
 */
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  app.get("/api", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("Accessing an API huh!?");
  });

  // Listen the server
  app.listen(port, host, ()=>{
    consola.ready({
      message: `HTTP Server Ready (Wait for NUXT) : http://${host}:${port}`,
      badge: true
    });
  });

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  /**
   * use this function as a filter function
   * Any route that has not be handled by NUXT, can be handled here
   * If you want NUXT to handle a route, you just say next()
   */
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(); // This means any other route, simply forward to Nuxt
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  consola.ready({
    message: `NUXT is ready!`,
    badge: true
  });
}
start();
