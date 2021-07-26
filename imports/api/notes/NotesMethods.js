import { NotesCollection } from "./NotesCollection";

Meteor.methods({
    'addNote'(text){
        return NotesCollection.insert({
            text: text,
        }, (err, res)=> {
            if (err) return err
            if (res) return res
        })
    },
    'deleteNote'(id) {
        return NotesCollection.remove({
            _id: id
        }, (err, res)=> {
            if (err) return err
            if (res) return res
        })
    }
})