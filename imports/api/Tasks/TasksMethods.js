import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    'addTask'(params) {
        return TasksCollection.insert({
            name: params.name,
            description: params.description},
            (err, res)=> {
                if (res) return res
                if (err) return err
        })
    },
    'removeTask':(id)=> TasksCollection.remove({_id: id}),
    'saveEditTask'(params) {
        return TasksCollection.update({_id: params.id}, {
            $set: {
                name: params.name,
                description: params.description
            }
        })
    }
    
})