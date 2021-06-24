import { TasksCollection } from '../../api/Tasks/TasksCollection';
import {Template} from 'meteor/templating';

import './TaskItem.html';

Template.Tasks.onCreated(function() {
    this.tasks = Meteor.subscribe('tasks')
})

Template.Tasks.helpers({
    getTasks:()=>TasksCollection.find({}, {sort: {createdAt: -1}})
})