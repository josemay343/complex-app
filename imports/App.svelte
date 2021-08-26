<script>
    import HomeLayout from '../imports/ui/Home/HomeLayout.svelte'
    import Tasks from '../imports/ui/Tasks/Tasks.svelte'
    // import {Route, router} from 'tinro'; 
    import { path, query, fragment, pattern } from 'svelte-pathfinder';
    import {fade} from 'svelte/transition';
    import Navbar from '../imports/ui/Navbar/Navbar.svelte'
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
    </div>
</main>