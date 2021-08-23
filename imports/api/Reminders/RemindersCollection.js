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
    'list.$.date': {
        type: String,
        label: 'Date of the item',
        optional: true
    },
    'list.$.time': {
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