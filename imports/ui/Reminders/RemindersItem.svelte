<script>
    import EditButtons from '../ReusableComponents/EditButtons/EditButtons.svelte'
    import {activeApp} from '../../api/stores'
    // Gets active app
    let app
    activeApp.subscribe(value=>{
        app = value
    })
    // local variables
    let newName, newDate, newTime
    // Reactive variables
    $: showEditButtons = false;
    $: editing = false
    // Props
    export let name, date, time, _id
    // Functions
    function handleMouseenter() {
        showEditButtons = true
    }
    function handleMouseleave() {
        showEditButtons = false
    }
    function handleRequest(event) {
        let request = event.detail.request
        switch(request) {
            case 'delete':
                Meteor.call('removeReminder', _id, (err, res)=> {
                    if (res) toastr.error('Reminder Deleted')
                    if (err) toastr.warning('Please try again')
                })
                break;
            case 'edit':
                editing = true
                break;
        }
    }
    function processEditReminder() {
        let params = {
            id: _id,
            name: (newName) ? newName.innerText : name,
            date: (newDate) ? newDate : date,
            time: (newTime) ? newTime : time 
        }
        Meteor.call('editReminder', params, ((err, res)=> {
            if (res) {
                toastr.success('Edit Successful')
                editing = false
            }
            if (err) toastr.error('Please Try again' + err)
        }))
    }
</script>

<div 
    class="reminderItemContainer"
    on:mouseenter={handleMouseenter}
    on:mouseleave={handleMouseleave}
>
    {#if showEditButtons}
        <EditButtons on:request={handleRequest} {app}/>
    {/if}
    {#if !editing}
        <div class="title name">{name}</div>
        <div class="title">{date}</div>
        <div class="title">{time}</div>
    {/if}
    {#if editing}
        <div class="title name" contenteditable autofocus bind:this={newName}>{name}</div>
        <input type="date" bind:value="{newDate}">
        <input type="time" bind:value="{newTime}">
        <button on:click={processEditReminder}>Save</button>
        <button on:click={()=> editing = false}>Cancel</button>
    {/if}
</div>