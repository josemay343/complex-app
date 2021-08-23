import { TasksCollection } from '../../../api/Tasks/TasksCollection';
import {Template} from 'meteor/templating';
import { Tracker } from 'meteor/tracker'

import '../AddTaskComponent/AddTaskComponent.html'
import '../AddTaskComponent/AddTaskComponent'
import '../TaskItem/TaskItem.html';
import '../TaskItem/TaskItem';
import '../../ReusableComponents/Tabs/Tabs.html'
import '../../ReusableComponents/Tabs/Tabs'

Template.Tasks.onCreated(function() {
    Meteor.subscribe('tasks')
    this.activeTab = new ReactiveVar('Not-Done')
    this.parentId = new ReactiveVar()
})

Template.Tasks.onRendered(function() {
    Tracker.autorun(()=> {
        this.parentId.set(
            TasksCollection.findOne({name: this.activeTab.get()})
        )
    })
})

Template.Tasks.helpers({
    getTasks(){
        let activeTab = Template.instance().activeTab.get();
        return TasksCollection.findOne({name:activeTab})?.list.reverse()
    },
    tabsArray() {
        let tabs = [
            {
                name: 'Tasks', 
                count: TasksCollection.findOne({name: 'Not-Done'})?.list.length
            },
            {
                name: 'Done', 
                count: TasksCollection.findOne({name: 'Done'})?.list.length,
                className: 'done'
            },
            {
                name: 'Snoozed',
                count: TasksCollection.findOne({name: 'Snoozed'})?.list.length,
            }
        ]
        return tabs;
    }
})