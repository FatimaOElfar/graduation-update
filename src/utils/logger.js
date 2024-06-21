import Module from "node:module";

export default class Logger {
  static log = (message, type) => {
    return type ? console.log(type, message) : console.log(message);
  };

  static require = (input) => {
    return Module.createRequire(import.meta.url)(input);
  };
}
