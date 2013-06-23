require(["app", "router"], function (app, Router) {
    app.router = new Router();

    Backbone.history.start({ pushState: true, root: app.root });

    app.router.navigate(app.root, {trigger: true});
});