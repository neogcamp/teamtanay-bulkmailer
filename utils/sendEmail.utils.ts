const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getButton = (loginLink: string) => `
    <table width="260" class="button" style="margin: 0px 0px 10px 30px;">
    <tr>
    <td class="btn-read-online" style="text-align: center; background-color: #F56565; padding: 10px 15px; border-radius: 5px;">
    <a href="${loginLink}" style="color: #fff; font-size: 18px; letter-spacing: 1px; text-decoration: none; text-shadow: 0px 2px 2px #4db24c; font-family: Arial, Helvetica, sans-serif;">login to WYZR</a>
    </td>
    </tr>
    </table>
`;

export const sendMail = (email: string, loginLink: string, delay: number) => {
  const msg = {
    to: email,
    from: "ishanjirety8@gmail.com",
    subject: "Sign-in link for WYZR",
    html: `
    <p style="text-align:left;"> Namaste  , </p>
    <p style="text-align:left;">
      Thank you for your application to join us in levelOne of the camp. After reviewing your application, we are excited to invite you for the interview.
    </p>
    <p style="text-align:left;">
      So we can get to know you better, the interview will be conducted over video using Google Meet and will last about 20 minutes in total.
    </p>

    <p style="text-align:left;">We want you to be able to plan accordingly, hence we’ve provided a list of date and time options. Please take a look and select the time slot which is best for you. Select slot </p>

    <p style="text-align:left; color:#1F1F1F"><small >--</small></p>

    <p style="text-align:left; color:#1F1F1F"> Thanks,</p>
    
    <p style="text-align:left; color:#1F1F1F">The neoG Camp Team,</p>
    
    <p style="text-align:left; color:#1F1F1F">Reviving web development learning for everyone.</p>
      `,
  };
  return setTimeout(() => sgMail.send(msg), delay);
};
