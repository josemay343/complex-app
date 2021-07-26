import {Template} from 'meteor/templating'
import "../../ReusableComponents/EditButtons.html"
import '../../ReusableComponents/EditButtons'

Template.TaskItem.onCreated(function() {
    this.showEditBtns = new ReactiveVar()
    this.editing = new ReactiveVar()
})

Template.TaskItem.onRendered(function() {
    /**
     * Main Function
     * @method {String} // Contains the method name
     * @template [Object] // Template object
     * @messages {Array} // Array of string of 2 messages for res and err
     */
    this.callMethod = (method, template, messages)=> {
        let id = template.data._id
        let name = template.find('.name').innerText
        let description = template.find('.description').innerText
        let parent = template.parent()
        let params ={
            id,
            name,
            description
        }
        Meteor.call(method, params, parent.activeTab.curValue, 
            (err, res)=> {
            if (res) toastr.success(messages[0])
            if (err) toastr.error(messages[1])
        })
    }
})

Template.TaskItem.helpers({
    showEditBtns:()=> Template.instance().showEditBtns.get(),
    editing:()=> Template.instance().editing.get(),
    buttons:()=> Template.instance().parent().activeTab.curValue
})

Template.TaskItem.events({
    'mouseenter':(e, template)=>template.showEditBtns.set(true),
    'mouseleave':(e, template)=>template.showEditBtns.set(false),
    'click .deleteBtn'(e, template){
        let parent = template.parent()
        Meteor.call('removeTask', template.data._id, parent.activeTab.curValue,
        (err, res)=> {
            if (res) toastr.error('Task deleted')
            if (err) toastr.warning('Please try again')
        })
    },   
    'click .editBtn':(e, template)=> template.editing.set(true),
    'click .cancelBtn':(e, template)=>template.editing.set(false),
    'click .savebtn'(e, template) {
        let messages = ['Task updated', 'Please try again']
        template.callMethod('saveEditTask', template, messages)
        template.editing.set(false);
    },
    'click .doneBtn'(e, template) {
        let messages = ['Task is Done!', 'Please try again']
        template.callMethod('addToDone', template, messages)
    },
    'click .snoozeBtn'(e, template) {
        let messages = ['Task snoozed', 'Please try again']
        template.callMethod('addToSnoozed', template, messages)
    },
    'click .notDoneBtn'(e, template) {
        let messages = ['Task unsnoozed', 'Please try again']
        template.callMethod('unsnoozed', template, messages)
    }
})
