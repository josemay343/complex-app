import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
 
export const TasksCollection = new Mongo.Collection('tasks');

const TasksCollectionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name of the task',
        optional: true
    },
    description: {
        type: String,
        label: 'Task Description',
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue() {
            return new Date()
        }
        
    }
})

TasksCollection.attachSchema(TasksCollectionSchema);

// if (Meteor.isServer) {
//     TasksCollection.allow({
//         insert: function() {
//             if (Meteor.userId) return true
//             return false
//         },
//         update: function() {
//             if (Meteor.userId) return true
//             return false
//         },
//         remove: function() {
//             if (Meteor.isServer) return true
//             return false
//         }
//     });
//     TasksCollection.deny({
//         insert: function() {
//             if (Meteor.userId) return false
//             return true
//         },
//         update: function() {
//             if (Meteor.userId) return false
//             return true
//         },
//         remove: function() {
//             if (Meteor.isServer) return false
//             return true
//         }
//     })
// }