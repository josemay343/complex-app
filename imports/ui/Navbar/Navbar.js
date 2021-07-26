import {Template} from 'meteor/templating';

Template.Navbar.onCreated(function() {
    this.loggedIn = new ReactiveVar(true)
})

Template.Navbar.helpers({
    loggedIn:()=>Template.instance.loggedIn?.get(),
})

Template.Navbar.events({
    
})