const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { renderBeginnerTemplate } = require("../templates");
const { createErrorLog } = require("./createErrorlog.utils");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = (email: string, loginLink: string, delay: number) => {
  const msg = {
    to: email,
    from: "neogcamp@gmail.com",
    subject: "TEST MAIL : Icon image fixed",
    html: renderBeginnerTemplate(),
  };
  return setTimeout(() => {
    try {
      // sgMail.send(msg);
      throw new Error("Error : Sending mail");
    } catch (e) {
      createErrorLog(e.message, getDate(), email);
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
