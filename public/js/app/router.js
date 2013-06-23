define(["backbone", "app", "models/movies", "views/movies", "models/movie", "views/movie", "views/edit"],
    function(Backbone, app, Collection, CollectionView, Model, View, EditView) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "new": "addMovie",
            "edit/:id": "editMovie"
        },

        index: function() {

            if (!app.collection) {
                app.collection = new Collection();
                app.collection.reset(data);
            }

            var cv = new CollectionView({model: app.collection});
            cv.render();

            app.collection.each(function (model) {
                new View({model: model});
                model.trigger('change');
            });

            $('#newMovie').off('click');
            $('#newMovie').on('click', function () {
                app.router.navigate('/new', {trigger: true});
            });
        },

        addMovie: function () {
            var movie = new Model();

            var editView = new EditView({model: movie});
            editView.render();
        },

        editMovie: function (id) {
            var movie = app.collection.get(id);

            var editView = new EditView({model: movie});
            editView.render();
        }
    });

    return Router;
});