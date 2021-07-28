const xlsx = require("xlsx");
const fs = require("fs");

// Types
type file = {
  Name: String;
  "Discord ID": String;
  "Role name": String;
};

type records = file[];

// Function definition
export const xlxToJson = async (fileName: String) => {
  let batches = 0;

  console.log(__dirname);
  const workBook = xlsx.readFile(
    __dirname.replace("Utils", "docs") + "\\" + `${fileName}`
  );

  const ws = workBook.Sheets["Sheet1"];

  const data = xlsx.utils.sheet_to_json(ws, { raw: false });

  let index = 0;
  let records: records = [];

  // Creating batches of 50 records
  data.forEach((member: file, key: Number) => {
    if (key < data.length - 1) {
      if (index === 53) {
        console.log(`> Created Batch ${batches} with`, index);
        records.push(member);
        ++batches;
        createJson(batches, fileName, records);
        records = [];
        index = 0;
      } else {
        records.push(member);
        index += 1;
      }
    } else {
      console.log(`> Created Batch ${batches} with`, index);
      records.push(member);
      ++batches;
      return createJson(batches, fileName, records);
    }
  });

  return new Promise((resolve) => resolve({ batches: batches }));
};

const createJson = (batch: Number, fileName: String, records: records) => {
  fs.writeFile(
    __dirname.replace("Utils", "json") +
      "\\" +
      `${fileName.replace(".xlsx", `_${batch}.json`)}`,
    JSON.stringify(records),
    (err: string) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
