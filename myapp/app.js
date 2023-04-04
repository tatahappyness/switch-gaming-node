const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const bodyParser = require('body-parser')

const app = express() 

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies

  extended: true

}))

//Congig file upload require
const fileUpload = require('express-fileupload')
app.use(fileUpload({

    useTempFiles : true,

    tempFileDir : '/uploads/'

}))
 
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/',  require('./routes/index'))  
app.use('/user',  require('./routes/users')) 
app.use('/admin', require('./routes/admin'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/api', require('./routes/api'))

//Graphql WS
app.use('/graphql/users', require('./graphql/graphql'), )


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app;
