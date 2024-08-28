const { extname, join } = require("path");
const { readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const SOURCE_DIR = "./src";
const DIST_DIR = "./dist";

const copyfiles = (directory) => {
  readdirSync(directory).forEach((file) => {
    const sourceDir = `./${join(directory, file)}`;
    if (statSync(sourceDir).isDirectory()) {
      return copyfiles(sourceDir);
    } else {
      if (extname(sourceDir) == ".graphql") {
        const distDir = sourceDir.replace(SOURCE_DIR, DIST_DIR);
        writeFileSync(distDir, readFileSync(sourceDir, "utf8"));
      }
    }
  });
};

copyfiles(SOURCE_DIR);
