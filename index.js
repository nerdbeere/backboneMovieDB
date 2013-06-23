var express = require('express');

var MDB = require('./app/mdb.js');

var app = express();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'mySecret'}));


// serve static files
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/style', express.static(__dirname + '/public/style'));
app.use('/font', express.static(__dirname + '/public/font'));
app.use('/img', express.static(__dirname + '/public/img'));

app.get('/', MDB.login);

app.post('/login', MDB.processLogin);

app.get('/logout', MDB.logout);

app.get('/mdb', MDB.checkAuth, MDB.mdb);

app.post('/movie', MDB.checkAuth, MDB.addMovie);

app.delete('/movie/:id', MDB.checkAuth, MDB.deleteMovie);

app.put('/movie/:id', MDB.checkAuth, MDB.updateMovie);

app.listen(8080);