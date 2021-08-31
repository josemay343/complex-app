import { RemindersCollection } from "./RemindersCollection";

Meteor.methods({
    'addReminder'(params) {
        return RemindersCollection.upsert({
            name: 'Reminder',
            owner: params.owner,
            username: params.username,
        }, {$push: {
                reminder: params.reminder
        }})
    },
    'removeReminder'(id) {
        return RemindersCollection.update({name: 'Reminder', 'reminder._id': id}, {
            $pull: {
                reminder: {
                    _id: id
                }
            }
        })
    },
    'editReminder'(params) {
        return RemindersCollection.update({name: 'Reminder', 'reminder._id': params.id}, {
            $set: {
                'reminder.$.name': params.name,
                'reminder.$.date': params.date,
                'reminder.$.time': params.time
            }
        })
    }
})