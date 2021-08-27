<script>
    import {RemindersCollection} from '../../api/Reminders/RemindersCollection'
    import RemindersItem from './RemindersItem.svelte'
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    Meteor.subscribe('reminders')

    $: reminders = useTracker(()=> RemindersCollection.find({}).fetch())
    let activetab = 'Not-Done'
</script>

{#each $reminders as reminder}
    {#if activetab === 'Not-Done'}
        {#each reminder.list.reverse() as item}
            <RemindersItem {...item}/>
        {/each}
    {/if}
{/each}