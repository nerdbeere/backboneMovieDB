define(['backbone', 'models/movie'], function (Backbone, Movie) {
    return Backbone.Collection.extend({
        model: Movie
    });
});
