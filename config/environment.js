require('dotenv').config();
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
})

const development = {
  name: 'development',
  asset_path: 'assets',
  session_cookie_key: 'blahsomething',
  db: 'codiel_development',
  smtp: {
    service: process.env.CODEIAL_SMTP_SERVICE,
    host: process.env.CODEIAL_SMTP_HOST ,
    port: process.env.CODEIAL_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
  jwt_secret: 'codeial',
  login_session_duration:2*1000*60,
  morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
  }
}

const production = {
  name: process.env.CODEIAL_ENVIRONMENT,
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: process.env.CODEIAL_SMTP_SERVICE,
    host: process.env.CODEIAL_SMTP_HOST ,
    port: process.env.CODEIAL_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  login_session_duration: process.env.CODEIAL_LOGIN_SESSION_DURATION,
  morgan:{
    mode:'combined',
    options:{stream:accessLogStream}
  }
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV)
