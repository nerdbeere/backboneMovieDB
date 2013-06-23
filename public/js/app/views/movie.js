define(['text!views/movie.html', 'app'], function (template, app) {
    return Backbone.View.extend({

        tagName: 'tr',

        events: {
            "click .icon-trash": "remove",
            "click .icon-edit": "edit",
            "click .rating": "rate"
        },

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            var data = {
                name: this.model.get('name'),
                year: this.model.get('year'),
                genre: this.model.get('genre'),
                rating: this.model.get('rating')
            };

            this.$el.html(_.template(template, data));

            if ($('body').find(this.$el).length === 0) {
                $('.movieTable tbody').append(this.$el);
            }
        },

        remove: function () {
            this.model.destroy().always(_.bind(function () {
                this.$el.remove();
            }, this));
        },

        edit: function () {
            app.router.navigate('/edit/' + this.model.get('id'), {trigger: true});
        },

        rate: function (e) {
            var rating = e.target.className.substr('17');
            this.model.set('rating', rating);
            this.model.save();
        }
    });
});

