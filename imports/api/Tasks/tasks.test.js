import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
 
import { TasksCollection } from './TasksCollection.js';
 
if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            it('can delete owned task', () => {
            });
        });
    });
}