import { NotesCollection } from "./NotesCollection";

Meteor.methods({
    'addNote':(text)=> NotesCollection.insert({text: text}),
    'deleteNote':(id)=>NotesCollection.remove({_id: id}),
    'saveEditNote'(params) {
        return NotesCollection.update({_id: params.id}, {$set: {
            text: params.text
        }})
    }
})