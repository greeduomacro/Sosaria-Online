"use strict";

if(process.argv.length !== 3) {
    console.log("Usage: node start.js name_of_service");
    console.log("name_of_service must match the service name in config.js");
    throw 1;
}

var serviceName = process.argv[2];

require("./src/lib/config")(serviceName);

var Server;

if(serviceName === "master") {
    Server = require("./src/master-server/master-server");
} else {
    // TODO
}

if(typeof Server !== "function") {
    console.log("Invalid server module " + serviceName);
    throw 2;
}

var server = new Server();

function atExit(err) {
    if(err)
        log.error("Error terminated process|" + err.stack);
    if(atExit.done)
        return;
    atExit.done = true;
    server.stop();
}
atExit.done = false;

process.on("exit", atExit);
process.on("SIGINT", atExit);
process.on("uncaughtException", atExit);
