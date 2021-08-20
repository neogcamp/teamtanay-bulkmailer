const fs = require("fs");
require("dotenv").config();

const { xlxToJson, dirCleanup, sendMail } = require("./Utils");

var cron = require("node-cron");

const filename = "TeamTanayRegisterations";

let task: any = "";
let batch = 1;
let batchesCount = 1;
const path = __dirname + "\\json";

async function setUpBatch() {
  const data = await xlxToJson(`${filename}.xlsx`);
  batchesCount = data.batches;
  // schedule("0 */15 8-18 * * *"
  // Setting up CRON job repeat after every 15 minutes between 8AM - 6PM
  task = cron.schedule("59 * * * * *", () => {
    console.log(
      `-----------------------------SENDING MAILS TO BATCH ${batch}--------------------------------`
    );
    if (batch <= data.batches) {
      let records = JSON.parse(
        fs.readFileSync(`./json/${filename}_${batch}.json`, {
          encoding: "utf8",
          flag: "r",
        })
      );

      batch += 1;
      for (let i = 0; i < records.length; i++) {
        const delay = (Math.floor(Math.random() * 10) + 5) * 1000;
        setTimeout(() => {
          console.log(i, " : ", records[i]["Email address"], delay);
          console.log(
            records[i]["Tell us about your web development background?"]
          );

          // sendMail(
          //   records[i]["Email address"],
          //   records[i]["Tell us about your web development background?"],
          //   delay
          // );
        }, delay);
      }
    } else {
      batch += 2;
    }
  });
}

// const intervalRef = setInterval(() => {
//   if (task !== "" && batch > batchesCount) {
//     console.log("> SIGCLEAR: CLEANING UP JSON FILES");
//     dirCleanup(filename, batchesCount, path);

//     console.log("> SIGSTOP: STOPPING CRON JOB");
//     task.stop();

//     clearInterval(intervalRef);
//   }
// }, 1000);

// setUpBatch();

sendMail(
  "",
  "Beginner level (Have some idea around coding/web development)",
  4000
);

export type records = {
  Timestamp: String;
  Name: String;
  "Discord id (tag)": String;
  "Tell us about your web development background?": String;
  "Email address": String;
};
