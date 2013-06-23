define(['text!views/edit.html', 'app', 'views/movie'], function (template, app, View) {
    "use strict";

    return Backbone.View.extend({

        tagName: 'div',
        className: 'modal hide fade editDialog',

        events: {
            'click #save': 'save'
        },

        render: function () {
            var data = {
                title: 'Filmdaten bearbeiten',
                name: this.model.get('name'),
                year: this.model.get('year'),
                genre: this.model.get('genre')
            }

            $('#main .editDialog').remove();

            this.$el.html(_.template(template, data));
            $('#main').append(this.$el);

            $('.editDialog').modal('show');
        },

        save: function () {
            var data = {
                name: $('#name').val(),
                year: $('#year').val(),
                genre: $('#genre').val()
            };

            this.model.save(data);

            var isNew = this.model.get('id') === undefined

            this.model.once("sync", _.bind(function () {
                if (isNew) {
                    app.collection.add(this.model);
                    var view = new View({model: this.model});
                    view.render();
                }

                $('.editDialog').modal('hide');

                app.router.navigate('/');
            }, this));


        }
    });
});

