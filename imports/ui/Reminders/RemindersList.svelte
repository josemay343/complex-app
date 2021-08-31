<script>
    import {RemindersCollection} from '../../api/Reminders/RemindersCollection'
    import RemindersItem from './RemindersItem.svelte'
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    Meteor.subscribe('reminders')
    // Reactive variables
    $: currentUser = useTracker(()=> Meteor.user())
    $: reminders = useTracker(()=> RemindersCollection.find({}).fetch())
</script>

{#each $reminders as item}
    {#if $currentUser._id === item.owner}
        {#each item.reminder.reverse() as reminder}
            <RemindersItem {...reminder}/>
        {/each}
    {/if}
{/each}