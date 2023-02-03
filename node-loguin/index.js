const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const app = express();

const auth = require('./auth/index.js');

app.use(volleyball);
app.use(bodyParser.jason());

app.get('/', (req, res) =>  {
	res.json({
		message: 'Hello Wordl'
	});
});

app.use('/auth', auth);

function notFound(req, res, next) {
	res.status(404);
	const error = new Error('Not Found - ' + req.originalUrl);
	next(error);
}

function errorHandler(err, req, res, next) {
	res.status(res.statusCode || 500);
	res.json({
		nessage: err.message,
		stack: err.stack
	});
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => {
	console.log('Listening on port', port);
});