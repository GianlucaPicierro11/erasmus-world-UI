//https://medium.com/@intellix/production-ready-angular-cli-in-heroku-4bcdc8322550
//https://medium.com/@intellix/production-ready-angular-cli-v1-0-0-with-i18n-and-localised-urls-1f3cf16cc204
const compression = require('compression');
const path = require('path');
const express = require('express');
const locale = require('locale');
const supportedLocales = ['en', 'it'];
const app = express();
const port = process.env.PORT || 8080;
// Gzip
app.use(compression());
// Serve static files from the dist directory
app.use(express.static(`${__dirname}/../dist/erasmus-world-ui`));
// Detect locale and determine best match
app.use(locale(supportedLocales));
// Start the app by listening on the default Heroku port
app.listen(port);
// Return index.html for all GET requests for PathLocationStrategy
// And accept locale style URLs: /en/example
app.get('/en/*', (req, res) => {
    console.log(`en`);
    res.sendFile(path.join(`${__dirname}/../dist/erasmus-world-ui/en/index.html`));
});
app.get('/it/*', (req, res) => {
    console.log(`it`);
    res.sendFile(path.join(`${__dirname}/../dist/erasmus-world-ui/it/index.html`));
});
app.get('/*', (req, res) => {
    console.log(`en`);
    res.sendFile(path.join(`${__dirname}/../dist/erasmus-world-ui/en/index.html`));
});
console.log(`Server listening on ${port}`);