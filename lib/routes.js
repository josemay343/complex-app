import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'home',
    action: function () {
        this.render("App", {
            area: "HomeLayout"
        });
    }
});

FlowRouter.route('/tasks', {
    name: 'tasks',
    action: function () {
        this.render("App", {
            area: "Tasks"
        });
    }
});