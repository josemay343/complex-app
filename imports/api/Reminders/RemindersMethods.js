import { RemindersCollection } from "./RemindersCollection";

Meteor.methods({
    'addReminder'(params) {
        return RemindersCollection.upsert({name: "Not-Done"}, {
            $push: {
                list: params
            },
        })
    }
})