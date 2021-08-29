<script>
    import HomeLayout from '../imports/ui/Home/HomeLayout.svelte'
    import Tasks from '../imports/ui/Tasks/Tasks.svelte'
    // import {Route, router} from 'tinro'; 
    import { path, query, fragment, pattern } from 'svelte-pathfinder';
    import {fade} from 'svelte/transition';
    import Navbar from '../imports/ui/Navbar/Navbar.svelte'
    import Notes from './ui/Notes/Notes.svelte';
    import Reminders from '../imports/ui/Reminders/Reminders.svelte'
    import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    let currentUser;

    $: currentUser = useTracker(() => Meteor.user());
</script>
<main>
    {#if $currentUser}
        <div class="loginContainer">
            <BlazeTemplate template="loginButtons" />
        </div>
        <Navbar />
        <div class="wrapper">
            {#if $pattern('/')}
                <div in:fade="{{ duration: 700}}">
                    <HomeLayout />
                </div>
            {/if}
            {#if $pattern('/tasks')}
                <div in:fade="{{ duration: 700}}">
                    <Tasks />
                </div>
            {/if}
            {#if $pattern('/notes')}
                <div in:fade="{{ duration: 700}}">
                    <Notes />
                </div>
            {/if}
            {#if $pattern('/reminders')}
                <Reminders />
            {/if}
        </div>
    {/if}
</main>