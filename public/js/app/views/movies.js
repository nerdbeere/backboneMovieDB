define(['text!views/movies.html'], function (template) {
    return Backbone.View.extend({
        tagName: 'table',
        className: 'movieTable table table-striped table-hover',

        render: function () {
            $('#logout').css('display', 'block');

            this.$el.html(_.template(template, {}));
            $('#main').append(this.$el);
        }
    });
});

