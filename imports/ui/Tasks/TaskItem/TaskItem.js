import {Template} from 'meteor/templating';

Template.TaskItem.onCreated(function() {
    let instance = this;
    instance.showEditBtns = new ReactiveVar();
    instance.editing = new ReactiveVar();
})

Template.TaskItem.helpers({
    showEditBtns:()=> Template.instance().showEditBtns.get(),
    editing:()=> Template.instance().editing.get()

})

Template.TaskItem.events({
    'mouseenter':(e, template)=>template.showEditBtns.set(true),
    'mouseleave':(e, template)=>template.showEditBtns.set(false),
    'click .delete':(e, template)=>Meteor.call('removeTask', template.data._id, 
    (err, res)=> {
        if (res) toastr.error('Task deleted')
        if (err) toastr.warning('Please try again')
    }),
    'click .edit':(e, template)=> template.editing.set(true),
    'click .cancelBtn':(e, template)=>template.editing.set(false),
    'click .savebtn':(e, template)=> {
        let name = template.find('.name').innerText;
        let description = template.find('.description').innerText;
        let params ={
            id: template.data._id,
            name,
            description

        }
        Meteor.call('saveEditTask', params, (err, res)=> {
            if (res) toastr.success('Task Updated!')
            if (err) toastr.error('Please try again')
        })
        template.editing.set(false);
    }
})
