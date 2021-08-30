import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
 
export const NotesCollection = new Mongo.Collection('notes');

const NotesCollectionSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'note object',
        optional: true
    },
    note: {
        type: String,
        label: 'Note html string',
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
    linkTo: {
        type: Array,
        label: 'Notes link to',
        optional: true
    },
    'linkTo.$': {
        type: String,
        label: 'Id of the item linked to',
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue() {
            return new Date()
        }
    }
})

NotesCollection.attachSchema(NotesCollectionSchema);