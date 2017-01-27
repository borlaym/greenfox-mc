import di from './container';

const path = require('path');
require("babel-core/register");
require("babel-polyfill");
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json());

di.container.get('config').update('cache', 'memory');

app.get('/', (req, res, next) => {
	const requestCounter = di.container.get('requestCounter');
	requestCounter.registerIncomingRequest(req.url, req.param, Date.now());
	next();
});

app.use('/', express.static(path.join(__dirname, process.env.PUBLIC_DIR)))


app.get('/stats', async (req, res) => {
	const requestCounter = di.container.get('requestCounter');
	const stats = await requestCounter.getStatistic();
	res.send(stats);
});

app.listen(8080, function () {
    console.log('Server listening on port 8080!')
})
