import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'
 
export const RemindersCollection = new Mongo.Collection('reminders');

const RemindersCollectionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Category',
        optional: true
    },
    reminder: {
        type: String,
        label: 'Not done item',
        optional: true
    },
    owner: {
        type: String,
        label: "Owner ID",
        optional: true
    },
    username: {
        type: String,
        label: "Owner username",
        optional: true
    },
    'reminder.$': {
        type: Object,
        label: 'Not done item info',
        optional: true
    },
    'reminder.$._id': {
        type: String,
        label: 'Item ID',
        autoValue: function() {
            if (this.operator == '$push')
            return Random.id()
        },
        optional: true
    },
    'reminder.$.name': {
        type: String,
        label: 'Name of the item',
        optional: true
    },
    'reminder.$.date': {
        type: String,
        label: 'Date of the item',
        optional: true
    },
    'reminder.$.time': {
        type: String,
        label: 'Time of the item',
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue() {
            return new Date()
        }
        
    }
})

RemindersCollection.attachSchema(RemindersCollectionSchema);