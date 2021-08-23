import {Template} from 'meteor/templating'
import {RemindersCollection} from '../../api/Reminders/RemindersCollection'
import './RemiderItem.html'
import './RemiderItem';

Template.RemindersList.onCreated(function() {
    Meteor.subscribe('reminders')
})

Template.RemindersList.helpers({
    getList:()=>RemindersCollection.findOne({name: "Not-Done"})?.list.reverse()
})