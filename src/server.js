import express from "express";
import fs from "fs";

class Server {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.static("upload"))
  }

  routes() {
    fs.readdirSync(`${process.cwd()}/src/routers`).map(async (file) => {
      this.server.use((await import("./routers/" + file)).default);
    });
  }
}

export default new Server().server;
