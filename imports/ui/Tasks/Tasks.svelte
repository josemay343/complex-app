<script>
    import {Meteor} from 'meteor/meteor'
    import { afterUpdate, onMount } from 'svelte';
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import TaskItem from './TaskItem.svelte'
    import AddTaskComponent from './AddTaskComponent.svelte';
    import {TasksCollection} from '../../api/Tasks/TasksCollection'
    import Tabs from '../ReusableComponents/Tabs/Tabs.svelte'
    import {activeTab} from '../../api/stores'
    // Active tab set from store
    let active
    activeTab.subscribe(value=>{
        active = value
    })
    //SEO
    let title = 'Hagana Secure Tasks'
    //ON Mount
    onMount(()=>Meteor.subscribe('tasks'))
    // reactive Variables
    $: tasks = useTracker(()=> TasksCollection.find({}).fetch())

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
        tabsArray[0].count = TasksCollection.findOne({name: 'Not-Done'})?.list.length
        tabsArray[1].count = TasksCollection.findOne({name: 'Done'})?.list.length
        tabsArray[2].count = TasksCollection.findOne({name: 'Snoozed'})?.list.length
    })
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content="The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.">
</svelte:head>

<h1>Secure Task creator</h1>
<AddTaskComponent {active}/>
<Tabs {tabsArray}/>
<ul class="tasksListContainer">
    {#each $tasks as category}
        {#if category.name == active}
            {#if category.list.length}
                {#each category.list.reverse() as task}
                    <TaskItem {...task} {active}/>
                {/each}
            {:else}
                <h2>No Tasks Available</h2>
            {/if}
        {/if}
    {/each}
</ul>