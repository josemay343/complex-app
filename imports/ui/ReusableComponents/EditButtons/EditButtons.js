import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';
import {Template} from 'meteor/templating'

Template.EditButtons.onRendered(function() {
    let deleteBtn = this.find('.deleteBtn')
    let editBtn = this.find('.editBtn')
    let shareBtn = this.find('.shareBtn')
    let snoozebtn = this.find('.snoozeBtn')
    let doneBtn = this.find('.doneBtn')
    let notDoneBtn = this.find('.notDoneBtn')
    tippy(deleteBtn, {
        content: 'Delete',
        animation: 'scale-subtle'
    })
    tippy(editBtn, {
        content: 'Edit',
        animation: 'scale-subtle'
    })
    tippy(shareBtn, {
        content: 'Share',
        animation: 'scale-subtle'
    })
    tippy(snoozebtn, {
        content: 'Snooze',
        animation: 'scale-subtle'
    })
    tippy(doneBtn, {
        content: 'Done',
        animation: 'scale-subtle'
    })
    tippy(notDoneBtn, {
        content: 'Mark updone',
        animation: 'scale-subtle'
    })
})