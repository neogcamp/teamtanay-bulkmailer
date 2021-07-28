const fs = require("fs");

export const createErrorLog = async (
  error: String,
  date: Date,
  email: String
) => {
  console.log(error, date, email);
  const data = `${error}\t\t\t${email}\n`;
  fs.appendFileSync(
    __dirname.replace("Utils", "logs") + "\\" + `error_log_${date}.txt`,
    data
  );
};
