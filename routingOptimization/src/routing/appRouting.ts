import http, { IncomingMessage, ServerResponse } from "http";
import * as url from "url";
import * as os from "os";
import * as fs from "fs";
import path from "path";
import { UserData } from "../users/users_data";

export class AppRouting {
  static appRouting(request: IncomingMessage, responce: ServerResponse) {
    let pathName = url.parse(request.url!).pathname;
    let method = request.method;

    if (pathName == "/user" && method == "GET") {
      new UserData().getAllUsers((result) => {
        responce.end(`<pre>${result}</pre>`);
      });
      //responce.write(`${users}`);

      //   responce.write(
      //     `<h1>${_url}Hi server</h1><br><h2>${filterPath} <br>${responce.statusCode}</h2><br><h3>method:${request.method}</h3>`
      //   );
    } else if (pathName == "/os" && method == "GET") {
      let osMap = {
        osMem: os.totalmem,
        osFreeMem: os.freemem,
        homeDir: os.homedir,
        sysName: os.hostname,
      };
      responce.write(`<h1>${osMap.sysName}</h1>`);
    } else if (pathName == "/fs" && method == "GET") {
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
    } else if (pathName === "/createUser" && method === "POST") {
      let body: any = "";
      request
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          let jsonResponce = JSON.parse(body);
          console.log(body);
          responce.end(`<h1>${jsonResponce.name} is created</h1>`);
        });

      //   let data = new UserData().createUser("Fiaz");
      //   responce.write(`${data}`);
    } else if (pathName === "/login" && method === "POST") {
      //login logic

      let body: any = "";
      request
        .on("data", (chunk) => {
          body += chunk;
        })

        .on("end", () => {
          let jsonResponce = JSON.parse(body);
          if (
            jsonResponce.email == "fiaz@div" &&
            jsonResponce.password == "123456"
          ) {
            responce.end(`user login successfuly`);
          } else {
            responce.end(`user login deniy`);
          }
        });
    } else {
      responce.write(`path not found`);
    }
  }
}
