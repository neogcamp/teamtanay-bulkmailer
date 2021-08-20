import {
  BEGINNER,
  ABSOLUTE_BEGINNER,
  ADVANCED,
  INTERMEDIATE,
  msg,
} from "../Types/lib-ambiguous-re-export";

const sgMail = require("@sendgrid/mail");
const {
  intermediateInterview,
  wrongResponse,
} = require("../extras/interview-mail.extras.js");

const fs = require("fs");

require("dotenv").config();

const {
  renderBeginnerTemplate,
  renderIntermediateTemplate,
  renderIntermediateInterview,
} = require("../templates");

const mailgun = require("mailgun-js");
const { createErrorLog } = require("./createErrorlog.utils");
const _ADVANCED =
  "Advanced level (Know a lot in web development, but love it and wish to learn more in a structured manner)";
const _INTERMEDIATE =
  "Intermediate level (Have been doing web development for 1 year or more)";
const _BEGINNER =
  "Beginner level (Have some idea around coding/web development)";
const _ABSOLUTE_BEGINNER =
  "Absolute Beginner level (Know nothing about web development, but wish to learn)";

export const sendMail = (
  email: string,
  route: BEGINNER | ABSOLUTE_BEGINNER | ADVANCED | INTERMEDIATE,
  delay: number,
  Name: String
) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_BASE_URL,
  });

  let msg: msg = "";
  console.log(
    !intermediateInterview.find((mailid: string) => mailid === email)
  );
  // If Email is not present in Invalid Response list then Only create message body
  if (
    (!intermediateInterview.find((mailid: string) => mailid === email) &&
      route === _ADVANCED) ||
    route === _INTERMEDIATE
  ) {
    msg = {
      to: email,
      from: "neogcamp@gmail.com",
      subject: `Admission are OPEN NOW for neoG Camp 2022`,
      html: renderIntermediateTemplate(),
    };
  } else if (
    (!intermediateInterview.find((mailid: string) => mailid === email) &&
      route === _BEGINNER) ||
    route === _ABSOLUTE_BEGINNER
  ) {
    msg = {
      to: email,
      from: "neogcamp@gmail.com",
      subject: `Admission are OPEN NOW for neoG Camp 2022`,
      html: renderBeginnerTemplate(),
    };
  } else if (intermediateInterview.find((mailid: string) => mailid === email)) {
    // If Found in IntermediateInterview then send Calender Invite
    msg = {
      to: email,
      from: "neogcamp@gmail.com",
      subject: `Admission are OPEN NOW for neoG Camp 2022`,
      html: renderIntermediateInterview(),
    };
  }
  return setTimeout(async () => {
    if (msg !== "") {
      mg.messages().send(msg, function (error: any, body: any) {
        try {
          if (error) {
            console.log(error.message);
            throw new Error(`Could not send mail`);
          }
          console.log("> Mail sent to ", email);
        } catch (e) {
          createErrorLog(e.message, getDate(), email);
        }
      });
    }
  }, delay);
};

const getDate = () => {
  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth() + 1;
  const year = current.getFullYear();
  const hours = current.getHours();
  return `${date}-${month}-${year}T${hours}H`;
};
