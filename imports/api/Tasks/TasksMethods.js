import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    'addTask'(params) {
        return TasksCollection.upsert({name: params.activeTab}, {
            $push: {
                list: params
            }
        })
    },
    'removeTask'(id, docType) {
        return TasksCollection.update({name: docType}, {
            $pull: {
                list:{
                    _id: id
                }
            }, 
        })
    },
    'addToDone'(params, docType) {
        TasksCollection.update({name: docType}, {
            $pull: {
                list:{_id: params.id}
            }
        })

        return TasksCollection.upsert({name: 'Done'}, {
            $push: {
                list: params
            }
        })
    },
    'addToSnoozed'(params, docType) {
        TasksCollection.update({name: docType}, {
            $pull: {
                list: {_id: params.id}
            }
        })

        return TasksCollection.upsert({name: 'Snoozed'}, {
            $push: {
                list: params
            }
        })
    },
    'saveEditTask'(params, docType) {
       return TasksCollection.update(
           {name: docType, "list._id": params.id},
           {$set: {
               'list.$.name': params.name,
               'list.$.description': params.description
           }}
        )
    },
    'unsnoozed'(params, docType) {
        TasksCollection.update({name: docType}, {
            $pull: {
                list: {_id: params.id}
            }
        })

        return TasksCollection.upsert({name: 'Not-Done'}, {
            $push: {
                list: params
            }
        })
     }
    
})