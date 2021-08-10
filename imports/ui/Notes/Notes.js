import {Template} from 'meteor/templating';
import { NotesCollection } from '../../api/notes/NotesCollection';
// Imports order are important
import './NotesItem.html'
import './NotesItem'

Template.Notes.onCreated(function() {
    Meteor.subscribe('notes')
})

Template.Notes.onRendered(function() {
   
/**
 * 
  ___   __ __  ____  _      _     
 /   \ |  |  ||    || |    | |    
|     ||  |  | |  | | |    | |    
|  Q  ||  |  | |  | | |___ | |___ 
|     ||  :  | |  | |     ||     |
|     ||     | |  | |     ||     |
 \__,_| \__,_||____||_____||_____|
 */
    let textArea = this.find('.textArea')
    let options = {
        placeholder: 'Type here to create note...',
        theme: 'snow'
    };
    let quill = new Quill(textArea, options);
})

Template.Notes.helpers({
    getNotes:()=> NotesCollection.find({}, {sort: {createdAt: -1}})
})

Template.Notes.events({
    'click .createBtn':(e, template)=> {
        let text = template.find('.ql-editor').innerHTML
        Meteor.call('addNote', text, (err, res)=> {
            if (res) {
                toastr.success('Note Added')
                template.find('.ql-editor').innerHTML = ''
            }
            if (err) toastr.error('Please try again')
        });
        
    }
})