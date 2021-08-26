<script>
    import {Meteor} from 'meteor/meteor'
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import { onMount } from 'svelte'
    import {TasksCollection} from '../../api/Tasks/TasksCollection'
    import {NotesCollection} from '../../api/Notes/NotesCollection'
    import {RemindersCollection} from '../../api/Reminders/RemindersCollection'

    onMount(()=> {
        Meteor.subscribe('notes')
        Meteor.subscribe('tasks')
        Meteor.subscribe('reminders')
    })
    $:notes = useTracker(()=> NotesCollection.find({}).fetch())
    $:tasks = useTracker(()=> TasksCollection.find({}).fetch()) 
    $:reminders = useTracker(()=> RemindersCollection.find({}).fetch()) 
</script>

<div class="homeContainer">
    <div class="banner">
        <h1>Recent:</h1>
        <div class="tasks">
            <h2>Tasks</h2>
            {#each $tasks as task}
                <div class="listItem">
                    <div class="name">{task.name}:</div>
                    <div class="count">{task.list.length}</div>
                </div>
            {/each}    
        </div>
        <div class="notes">
            <h2>Notes</h2>
            <div class="listItem">
                <div class="name">Total: </div>
                <div class="count">{$notes.length}</div>
            </div>
        </div>
        <div class="notes">
            <h2>Reminders</h2>
            {#each $reminders as reminder}
                <div class="listItem">
                    <div class="name">{reminder.name}:</div>
                    <div class="count">{reminder.list.length}</div>
                </div>
            {/each}   
        </div>
    </div>
</div>