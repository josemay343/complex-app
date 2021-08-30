import { NotesCollection } from "./NotesCollection";

Meteor.methods({
    'addNote':(params)=> NotesCollection.insert(
            {
                name: 'Note',
                owner: params.owner,
                username: params.username,
                note: params.note
            }),
    'deleteNote':(id)=>NotesCollection.remove({_id: id}),
    'saveEditNote'(params) {
        return NotesCollection.update({_id: params.id}, {$set: {
            note: params.note
        }})
    }
})