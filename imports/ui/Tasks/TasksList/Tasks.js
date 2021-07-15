import { TasksCollection } from '../../../api/Tasks/TasksCollection';
import {Template} from 'meteor/templating';

import '../TaskItem/TaskItem.html';
import '../TaskItem/TaskItem';

Template.Tasks.onCreated(function() {
    Meteor.subscribe('tasks')
})

Template.Tasks.helpers({
    getTasks:()=>TasksCollection.find({}, {sort: {createdAt: -1}})
})