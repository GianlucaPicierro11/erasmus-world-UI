//https://medium.com/geekculture/how-to-easily-deploy-your-first-angular-app-on-heroku-65dd546c8181

const express = require('express');
const path = require('path');
const app = express();
app.get('/:ln/*', function (req, res) {
    appLang(req.params.ln)
    res.sendFile(path.join(__dirname +
        '/dist/erasmus-world-ui/' + req.params.ln + '/index.html'));
});
app.listen(process.env.PORT || 8080);

function appLang(language) { //add language here
    const distFolder = join(process.cwd(), 'dist/erasmus-world-ui/', language); //Use language here
    app.use(express.static(distFolder));
}
