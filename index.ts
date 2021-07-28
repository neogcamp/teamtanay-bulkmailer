const sgMail = require("@sendgrid/mail");

const fs = require("fs");
require("dotenv").config();

const { xlxToJson, dirCleanup, sendMail } = require("./Utils");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var cron = require("node-cron");

const filename = "demo";

let task: any = "";
let batch = 1;
let batchesCount = 1;
const path = __dirname + "\\json";

async function setUpBatch() {
  const data = await xlxToJson(`${filename}.xlsx`);
  batchesCount = data.batches;

  // Setting up CRON job repeat after every 15 minutes between 8AM - 6PM
  task = cron.schedule("0 */15 8-18 * * *", () => {
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
        }, delay);
      }
    } else {
      batch += 2;
    }
  });
}

const intervalRef = setInterval(() => {
  if (task !== "" && batch > batchesCount) {
    console.log("> SIGCLEAR: CLEANING UP JSON FILES");
    dirCleanup(filename, batchesCount, path);

    console.log("> SIGSTOP: STOPPING CRON JOB");
    task.stop();

    clearInterval(intervalRef);
  }
}, 1000);

setUpBatch();
// sendMail("tanvipriya25@gmail.com", "");
sendMail("ishanjirety24@gmail.com", "");

export type records = {
  Timestamp: String;
  Name: String;
  "Discord id (tag)": String;
  "Tell us about your web development background?": String;
  "Email address": String;
};
