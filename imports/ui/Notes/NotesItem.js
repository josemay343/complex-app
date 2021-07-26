import {Template} from 'meteor/templating'
import "../ReusableComponents/EditButtons.html"

Template.NotesItem.onCreated(function() {
    this.showEditButtons = new ReactiveVar(false)
    this.showPopup = new ReactiveVar(false)
})

Template.NotesItem.helpers({
    showEditButtons:()=>Template.instance().showEditButtons.get(),
    showPopup:()=>Template.instance().showPopup.get()
})

Template.NotesItem.events({
    'mouseenter .noteContainer':(e, template)=> template.showEditButtons.set(true),
    'mouseleave .noteContainer':(e, template)=>template.showEditButtons.set(false),
    'click .editBtn':(e, template)=>template.showPopup.set(true),
    'click .overlay':(e, template)=>template.showPopup.set(false),
    'click .deleteBtn':(e, template)=>{
        Meteor.call('deleteNote', template.data._id, 
        (err, res)=>{
            console.log(err, res)
            if (err) toastr.warning('Please try again')
            if (res) toastr.error('Note Deleted')
        })
    }
})