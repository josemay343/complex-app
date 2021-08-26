import {Meteor} from 'meteor/meteor'
import { NotesCollection } from './NotesCollection'

Meteor.publish('notes',function() {
    return NotesCollection.find({})
})