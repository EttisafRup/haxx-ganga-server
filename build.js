const child = require("child_process")
child.execSync("tsc")
require("./dist/index.js")
