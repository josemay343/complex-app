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
    $:currentUser = useTracker(()=> Meteor.user())
</script>

<div class="homeContainer">
    <h1>Hi {$currentUser.username}</h1>
    <div class="banner">
        <h1>Recent:</h1>
        <div class="category">
            <h2>Tasks</h2>
            {#each $tasks as task}
                {#if task.owner === $currentUser._id}
                    <div class="listItem">
                        <div class="name">{task.category}:</div>
                        <div class="count">{task.list.length}</div>
                    </div>
                {/if}
            {/each}    
        </div>
        <div class="category">
            <h2>Notes</h2>
            <div class="listItem">
                <div class="name">Total: </div>
                {#if $notes[0]?.owner === $currentUser._id}
                    <div class="count">{$notes.length}</div>
                    {:else}
                    <div class="count">0</div>
                {/if}
            </div>
        </div>
        <div class="category">
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