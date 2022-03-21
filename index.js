const express = require('express')
const env = require('./config/environment')
const logger = require('morgan');

const cookieParser = require('cookie-parser')
const app = express()
require('./config/view-helpers')(app)
const port = 9000
const expresLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
//Used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy.js')
const passportGoogle = require('./config/passport-google-oauth2-strategy')

const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customMware = require('./config/middleware')

//Setting up Chat Server to be used with socket.io
const { createServer } = require('http')
const chatServer = createServer(app)
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000, () => {
  console.log('Listening on port 5000')
})

const path = require('path')
//** End Of Requiring packages */

console.log("Environment :",env.name);
if (env.name == 'development') {
  app.use(
    sassMiddleware({
      /* Options */
      src: path.join(__dirname, 'assets', 'scss'),
      dest: path.join(__dirname, 'assets', 'css'),
      debug: true,
      outputStyle: 'extended',
      prefix: '/css',
    })
  )
}

app.use(express.urlencoded())

app.use(cookieParser())

app.use(express.static(env.asset_path))

// make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(logger(env.morgan.mode,env.morgan.options))

app.use(expresLayouts)

// Extract Style & Script from sub pages
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//View Templetes for for Front End
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(
  session({
    name: 'codeial',

    //TODO change the secret before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: db._connectionString,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect-mongo setup is ok')
      }
    ),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

app.use(flash())
app.use(customMware.setFlash)

// Use Express Router Middleware
app.use('/', require('./routes'))

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running server'.err)
    return
  }
  console.log(`Server is running on ${port} .....`)
})
