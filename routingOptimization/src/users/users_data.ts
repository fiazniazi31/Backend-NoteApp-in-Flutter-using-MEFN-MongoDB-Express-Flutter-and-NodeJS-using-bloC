import * as fs from "fs";
import * as path from "path";

export class UserData {
  getAllUsers(callBack: (responce: string | undefined) => void): void {
    fs.readFile(
      path.join(__dirname, "user_responce.json"),
      "utf-8",
      (error, result) => {
        callBack(result);
      }
    );
  }
  createUser(name: string): string {
    return "hi " + name;
  }
}
