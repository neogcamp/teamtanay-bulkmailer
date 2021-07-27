# TeamTanay Bulk Mailer

### This script will be used to send bulk mails to candidates.


**Installation Steps** 
  
  - Clone this repository 
  - ``git clone ``
  - install the dependencies using ``npm install``
  - Update .env with `SEND GRID` secret key
  - Build the project `npm run build`
  - Run `npm start` to start the script


**Process**
- Put `.xlsx` file in docs folder. From there script will read the excel and split them in chunks of `50` records per file and will conver it into `json`.
- After conversion a `CRON` job will be scheduled which will run the script after every `1 hour`.
- After the execution is completed the `JSON` files will be cleared.

**Tech Stack**
- NodeJs
- Typescript

**Modules**
- File system : [fs](https://www.npmjs.com/package/fs) 
- Cron Job : [node-cron](https://www.npmjs.com/package/node-cron)
- Excel Reader : [xlsx](https://www.npmjs.com/package/xlsx)