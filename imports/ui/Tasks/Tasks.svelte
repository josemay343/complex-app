<script>
    //IMport statements
    import {Meteor} from 'meteor/meteor'
    import { afterUpdate, onMount } from 'svelte';
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import {TasksCollection} from '../../api/Tasks/TasksCollection'
    import {fade} from 'svelte/transition'
    import {activeTab} from '../../api/stores'
    import {activeApp} from '../../api/stores'
    // Import components
    import TaskItem from './TaskItem.svelte'
    import AddTaskComponent from './AddTaskComponent.svelte';
    import Tabs from '../ReusableComponents/Tabs/Tabs.svelte'
    // Sets the category 
    activeApp.set('tasks')
    // Active tab set from store
    let category
    activeTab.subscribe(value=>{
        category = value
    })
    //SEO
    let title = 'Hagana Secure Tasks'
    //ON Mount
    onMount(()=>Meteor.subscribe('tasks'))
    // reactive Variables
    $: tasks = useTracker(()=> TasksCollection.find({}).fetch())
    $: currentUser = useTracker(()=> Meteor.user());

    let tabsArray = [
        {
            name: 'Not-Done', 
            count: 0,
        },
        {
            name: 'Done', 
            count: 0,
            className: 'done'
        },
        {
            name: 'Snoozed',
            count: 0,
        }
    ]
    // ...the DOM is now in sync with the data
    afterUpdate(()=> {
        tabsArray[0].count = TasksCollection.findOne({owner: $currentUser._id, category: 'Not-Done'})?.list.length
        tabsArray[1].count = TasksCollection.findOne({owner: $currentUser._id, category: 'Done'})?.list.length
        tabsArray[2].count = TasksCollection.findOne({owner: $currentUser._id, category: 'Snoozed'})?.list.length
    })
</script>

<svelte:head>
    // SEO head
    <title>{title}</title>
    <meta name="description" content="The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.">
</svelte:head>

<h1>Secure Task creator</h1>
<AddTaskComponent {category}/>
<Tabs {tabsArray}/>
<ul class="tasksListContainer">
    {#each $tasks as task}
        {#if task.owner === $currentUser._id}
            {#if task.category == category}
                {#if task.list.length}
                    {#each task.list.reverse() as task}
                        <div in:fade={{duration: 100}}>
                            <TaskItem {...task} {category}/>
                        </div>
                    {/each}
                {:else}
                    <h2>No Tasks Available</h2>
                {/if}
            {/if}
        {/if}
    {/each}
</ul>