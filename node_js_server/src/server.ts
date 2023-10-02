import http, { IncomingMessage, ServerResponse } from "http";
import * as url from "url";
import * as os from "os";
import * as fs from "fs";
import path from "path";
import { UserData } from "./users/users_data";

const hostName: string = "localhost";
const portNumber: number = 5000;

http
  .createServer((request: IncomingMessage, responce: ServerResponse) => {
    responce.statusCode = 200;
    responce.setHeader("content-type", "text/html");

    let _url = request.url;
    let queryParams = url.parse(_url!).query;
    let pathName = url.parse(_url!).pathname;
    let user = new UserData();

    let filterPath = queryParams?.split("data=").pop()!.replaceAll("%20", " ");
    if (pathName == "/user") {
      user.getAllUsers((result) => {
        responce.end(`<pre>${result}</pre>`);
      });
      //responce.write(`${users}`);

      //   responce.write(
      //     `<h1>${_url}Hi server</h1><br><h2>${filterPath} <br>${responce.statusCode}</h2><br><h3>method:${request.method}</h3>`
      //   );
    } else if (pathName == "/os") {
      let osMap = {
        osMem: os.totalmem,
        osFreeMem: os.freemem,
        homeDir: os.homedir,
        sysName: os.hostname,
      };
      responce.write(`<h1>${osMap.sysName}</h1>`);
    } else if (pathName == "/fs") {
      fs.readFile(
        path.join(__dirname, "user_responce.json"),
        "utf-8",
        (error, result) => {
          if (error) {
            responce.write(`${error}`);
          } else {
            responce.write(`<pre>${result}</pre>`);
          }
          responce.end();
        }
      );
    } else if ("/createUser") {
      let data = user.createUser("Fiaz");
      responce.write(`${data}`);
    } else {
      responce.write(`path not found`);
    }

    // responce.end();
  })
  .listen(portNumber, hostName, () => {
    console.log("Succed");
    console.log(`http://${hostName}:${portNumber}`);
  });
