import {Meteor} from 'meteor/meteor'
import App from '../imports/App.svelte'
import '../imports/startup/accounts-config.js';

Meteor.startup(()=> {
    new App({
        target: document.body
    });
})