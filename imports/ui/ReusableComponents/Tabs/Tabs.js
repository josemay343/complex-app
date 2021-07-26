import {Template} from 'meteor/templating';

Template.Tabs.onCreated(function() {
    this.activeTab = new ReactiveVar('Not-Done')
})

Template.Tabs.events({
    'click .tab':(e, template)=> {
        let activeTab = e.target.innerText
        let parent = template.parent()
        switch(activeTab) {
            case "DONE": 
                parent.activeTab.set('Done')
                break
            case "TASKS":
                parent.activeTab.set('Not-Done')
                break
            case "SNOOZED":
                parent.activeTab.set('Snoozed')
                break
        }
    }
})