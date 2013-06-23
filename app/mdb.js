var MDB = {

    _db: null,

    getDb: function () {
        if (!MDB._db) {
            var sqlite3 = require('sqlite3').verbose();
            MDB._db = new sqlite3.Database('db/movieDB');
        }
        return MDB._db;
    },

    checkAuth: function (req, res, next) {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    },

    login: function (req, res, next) {
        if (req.session.user) {
            res.redirect('/mdb');
        }

        res.render('login');
    },

    processLogin: function (req, res, next) {
        var data = [req.body.username, req.body.password];

        var db = MDB.getDb();

        db.get('SELECT * FROM users WHERE username = ? AND password = ?', data, function (err, row) {
            if (row) {
                req.session.user = row.username;
                res.redirect('/mdb');
            } else {
                res.redirect('/');
            }
        });
    },

    logout: function (req, res, next) {
        delete req.session.user;
        res.redirect('/');
    },

    mdb: function (req, res, next) {
        var db = MDB.getDb();

        var sql = 'SELECT movies.id, movies.name, movies.year, movies.genre, rating.rating FROM movies ' +
            'LEFT JOIN rating ON movies.id = rating.movies_id AND rating.users_id = users.id ' +
            'LEFT JOIN users ON users.id = rating.users_id ' +
            'WHERE username IS NULL OR username = ?';

        db.all(sql, [req.session.user], function (err, data) {
            res.render('mdb', {"data": JSON.stringify(data)});
        });
    },

    addMovie: function (req, res, next) {
        var db = MDB.getDb();

        var data = [req.body.name, parseInt(req.body.year), req.body.genre];

        db.run('INSERT INTO movies (`name`, `year`, `genre`) VALUES (?, ?, ?)', data, function (lastId) {
            res.end('{"id": ' + this.lastID + '}');
        });
    },

    updateMovie: function (req, res) {
        var db = MDB.getDb();

        var data = [
            req.body.name,
            req.body.year,
            req.body.genre,
            req.body.id
        ];

        var rating = [
            req.session.user,
            req.body.id,
            req.body.rating
        ];

        db.run('UPDATE movies SET name = ?, year = ?, genre = ? WHERE id = ?', data, function () {
            db.run('INSERT OR REPLACE INTO rating (users_id, movies_id, rating) VALUES ((SELECT id FROM users WHERE username = ?), ?, ?)', rating, function () {
                res.end('{"id": '+ req.params.id + '}');
            });
        });
    },

    deleteMovie: function (req, res) {
        var db = MDB.getDb();

        db.run('DELETE FROM movies WHERE id = ?', req.params.id, function (err) {
            res.end('{"id": '+ req.params.id + '}');
        });
    }

};

module.exports = MDB;