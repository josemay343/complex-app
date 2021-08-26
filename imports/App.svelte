<script>
    import HomeLayout from '../imports/ui/Home/HomeLayout.svelte'
    import Tasks from '../imports/ui/Tasks/Tasks.svelte'
    // import {Route, router} from 'tinro'; 
    import { path, query, fragment, pattern } from 'svelte-pathfinder';
    import {fade} from 'svelte/transition';
    import Navbar from '../imports/ui/Navbar/Navbar.svelte'
    import Notes from './ui/Notes/Notes.svelte';
    import {activeApp} from '../imports/api/stores'
</script>
<main>
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
    </div>
</main>