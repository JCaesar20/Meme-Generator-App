const express = require('express')
const path = require('path')
const app = express();
require('./src/db/mongoose')
const memeRouter = require('./src/router/meme')
const userRouter = require('./src/router/user')
const cookieParser = require('cookie-parser')
const port =process.env.PORT
 
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './public/views'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(memeRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server has started')
});