import http, { IncomingMessage, ServerResponse } from "http";
import * as url from "url";
import * as os from "os";
import * as fs from "fs";
import path from "path";
import { UserData } from "./users/users_data";
import { AppRouting } from "./routing/appRouting";

const hostName: string = "localhost";
const portNumber: number = 5000;

http
  .createServer((request: IncomingMessage, responce: ServerResponse) => {
    responce.statusCode = 200;
    responce.setHeader("content-type", "text/html");

    // let _url = request.url;
    // let queryParams = url.parse(_url!).query;
    // let pathName = url.parse(_url!).pathname;
    // let user = new UserData();

    AppRouting.appRouting(request, responce);

    // let filterPath = queryParams?.split("data=").pop()!.replaceAll("%20", " ");

    responce.end();
  })
  .listen(portNumber, hostName, () => {
    console.log("Routing Succeed");
    console.log(`http://${hostName}:${portNumber}`);
  });
