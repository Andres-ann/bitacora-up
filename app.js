require('dotenv').config();
const express = require('express');
const { json } = require('express/lib/response');
const app = express();

const port = process.env.PORT || 3200;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/', require('./router'));

app.listen(port, () => {
    console.log(`listening on port: http://localhost:${port}`);
});