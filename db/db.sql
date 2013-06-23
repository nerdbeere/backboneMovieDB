CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT ,
    name VARCHAR(255),
    year INTEGER(4),
    genre VARCHAR(255)
);
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE rating (
    movies_id INTEGER FOREIGN KEY REFERENCES movies(id) ON DELETE CASCADE ,
    users_id INTEGER FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER
);

CREATE TABLE rating (
  movies_id INTEGER,
  users_id INTEGER,
  rating INTEGER,
  FOREIGN KEY(movies_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY(users_id) REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (movies_id, users_id)
);

insert into users (username, password) VALUES ('admin', 'test');
insert into movies (name, year, genre) VALUES ('Iron Man', 2008, 'Action');