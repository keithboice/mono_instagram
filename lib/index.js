"use strict";

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"]
});

exports.printMsg = function () {
  console.log("This is a message from the demo package");
};