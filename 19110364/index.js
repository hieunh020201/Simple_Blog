const path = require('path');
const express = require('express');
const app = express();
const PORT = 5000;

const postReq = require('./routes/routes.posts')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/site', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true,
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(express.json());

// app.get('/hello', (req, res) => {
//     res.render('index', {
//         title: 'indexpage',
//     });
// });

app.use('/', postReq);

app.listen(PORT);