import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    'addTask'(params) {
        return TasksCollection.upsert({name: "Not-Done"}, {
            $push: {
                list: params
            }
        })
    },
    'removeTask'(id, collectionType) {
        return TasksCollection.update({name: collectionType}, {
            $pull: {
                list:{
                    _id: id
                }
            }, 
        })
    },
    'addToDone'(params, collectionType) {
        TasksCollection.update({name: collectionType}, {
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
    'addToSnoozed'(params, collectionType) {
        TasksCollection.update({name: collectionType}, {
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
    'saveEditTask'(params, collectionType) {
       return TasksCollection.update(
           {name: collectionType, "list._id": params.id},
           {$set: {
               'list.$.name': params.name,
               'list.$.description': params.description
           }}
        )
    },
    'unsnoozed'(params, collectionType) {
        TasksCollection.update({name: collectionType}, {
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