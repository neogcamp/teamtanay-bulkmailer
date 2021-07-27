const fs = require("fs");

export const dirCleanup = (filename: String, batches: number, path: String) => {
  for (let i = 1; i < batches + 1; ++i) {
    fs.unlink(path + "\\" + filename + `_${i}.json`, (err: String) => {
      if (err) return console.log("Error occured", err);
      return console.log(`File ${filename}_${i} deleted`);
    });
  }
};
