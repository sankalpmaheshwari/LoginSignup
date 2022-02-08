'use strict'
const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const { route } = require('./routes/pages')

dotenv.config({ path: './.env' })
const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'hbs')
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE,
})

db.connect((Error) => {
	if (Error) {
		console.log(Error)
	} else {
		console.log('MYSQL Connected.....')
	}
})

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen('3535', () => {
	console.log('Server started at port 3535')
})
