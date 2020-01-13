process.title = 'Pretendo - eShop';

const express = require('express');
//const subdomain = require('express-subdomain');
const hbs = require( 'express-handlebars');
const morgan = require('morgan');
const logger = require('./logger');
const config = require('./config.json');

const { http: { port } } = config;
const app = express();

// Routers for subdomains
const ROUTERS = {
	WUP: express.Router() // WiiU
};

// Route definitions
logger.info('Importing routes');
const ROUTES = {
	WUP: { // WiiU
		main: require('./routes/wiiu/main')
	}
};

// START APPLICATION
app.set('etag', false);
app.disable('x-powered-by');
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
	extname: 'hbs',
	layoutsDir: __dirname + '/../views/pages/'
}));

// Create router
logger.info('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// Setup routes
logger.info('[WUP] Applying imported routes');
app.use('/', ROUTES.WUP.main);


// Starts the server
logger.info('Starting server');
app.listen(port, () => {
	logger.success(`Server started on port ${port}`);
});