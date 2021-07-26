import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'
 
export const TasksCollection = new Mongo.Collection('tasks');

const TasksCollectionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Category',
        optional: true
    },
    list: {
        type: Array,
        label: 'Not done item',
        optional: true
    },
    'list.$': {
        type: Object,
        label: 'Not done item info',
        optional: true
    },
    'list.$._id': {
        type: String,
        label: 'Item ID',
        autoValue: function() {
            if (this.operator == '$push')
            return Random.id()
        },
        optional: true
    },
    'list.$.name': {
        type: String,
        label: 'Name of the item',
        optional: true
    },
    'list.$.description': {
        type: String,
        label: 'Name of the item',
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