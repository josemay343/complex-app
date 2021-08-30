import { TasksCollection } from "./TasksCollection";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'addTask'(owner, params) {
        return TasksCollection.upsert(
            {
                category: owner.category,
                owner: owner.owner,
                username: owner.username
            }, {
            $push: {
                list: params
            }
        })
    },
    'removeTask'(id, category) {
        return TasksCollection.update({category: category, "list._id": id}, {
            $pull: {
                list:{
                    _id: id
                }
            }, 
        })
    },
    'addToDone'(params, owner) {
        TasksCollection.update({category: owner.category, "list._id": params.id}, 
            {
                $pull: {
                    list:{_id: params.id}
            }
        })
        return TasksCollection.upsert(
            {
                category: 'Done',
                owner: owner.owner,
                username: owner.username
            }, {
            $push: {
                list: params
            }
        })
    },
    'addToSnoozed'(params, owner) {
        TasksCollection.update({category: owner.category, "list._id": params.id}, 
            {
                $pull: {
                    list: {_id: params.id}
            }
        })
        return TasksCollection.upsert(
            {
                category: 'Snoozed',
                owner: owner.owner,
                username: owner.username
            }, {
            $push: {
                list: params
            }
        })
    },
    'saveEditTask'(params, owner) {
       return TasksCollection.update({category: owner.category, "list._id": params.id}, 
            {
                $set: {
               'list.$.name': params.name,
               'list.$.description': params.description
           }
        })
    },
    'unsnoozed'(params, owner) {
        TasksCollection.update({category: owner.category, "list._id": params.id}, 
        {
            $pull: {
                list: {_id: params.id}
            }
        })
        return TasksCollection.upsert(
            {
                category: 'Not-Done',
            }, {
            $push: {
                list: params
            }
        })
     }
    
})