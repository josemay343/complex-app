import { Meteor } from 'meteor/meteor';
import { RemindersCollection } from './RemindersCollection';

Meteor.publish('reminders', function publishReminders() {
  return RemindersCollection.find({});
});