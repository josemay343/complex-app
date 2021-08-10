import {Template} from 'meteor/templating';
// import Quill from 'quill'

Template.NotesEdit.onRendered(function() {
    let textArea = this.find('.textArea')
    let options = {
        // placeholder: 'Type here to create note...',
        theme: 'snow'
    };
    let quill = new Quill(textArea, options);
})

Template.NotesEdit.events({
    'click .savebtn'(e, template) {
        let text = template.find('.ql-editor').innerHTML
        let params ={
            id: template.data._id,
            text
        }
        Meteor.call('saveEditNote', params, (err, res)=> {
            if (res) toastr.success('Edit Successful')
            if (err) toastr.error('Please Try again')
        })
        template.parent().showPopup.set(false)
    },
    'click .cancelBtn'(e, template) {
        template.parent().showPopup.set(false)
    }
})