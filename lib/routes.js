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

FlowRouter.route('/notes', {
    name: 'notes',
    action: function () {
        this.render("App", {
            area: "Notes"
        });
    }
});

FlowRouter.route('/reminders', {
    name: 'reminders',
    action: function () {
        this.render("App", {
            area: "Reminders"
        });
    }
});