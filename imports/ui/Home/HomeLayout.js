import {Template} from 'meteor/templating';
import {NotesCollection} from '../../api/Notes/NotesCollection'
import {TasksCollection} from '../../api/Tasks/TasksCollection'
import {RemindersCollection} from '../../api/Reminders/RemindersCollection'

Template.HomeLayout.onCreated(function() {
    Meteor.subscribe('tasks')
    Meteor.subscribe('notes')
    Meteor.subscribe('reminders')
})

Template.HomeLayout.helpers({
    getNotes:()=>NotesCollection.find({}).count(),
    getTasks:()=>TasksCollection.findOne({name: 'Not-Done'})?.list.length,
    getReminders:()=>RemindersCollection.findOne({name: "Not-Done"})?.list.length
})