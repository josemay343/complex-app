import {Template} from 'meteor/templating';
import '../ReusableComponents/Tabs/Tabs.html'
import '../ReusableComponents/Tabs/Tabs'
import './RemindersList.html'
import './RemindersList'

Template.Reminders.onCreated(function() {
    Meteor.subscribe('reminders')
})

Template.Reminders.events({
    'click .saveBtn':(e, template)=> {
        let name = template.find('.nameInput').value
        let date = template.find('.dateInput').value
        let time = template.find('.timeInput').value

        if (!name || !date || !time) return toastr.error('Fields Cannot be Empty')
        let params = {
            name,
            date,
            time
        }
        console.log(params)
        Meteor.call('addReminder', params, (err, res)=> {
            if (res) toastr.success('Reminder Added')
            if (err) toastr.error('Please Try again' + err)
        })
    }
})