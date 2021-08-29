<script>
    import EditButtons from '../ReusableComponents/EditButtons/EditButtons.svelte'
    import {activeApp} from '../../api/stores'
    let app
    activeApp.subscribe(value=> {
        app = value
    })
    //Props
    export let name, description, category, _id
    // Reactive Variables
    $: showEditButton = false
    $: editing = false
    // DOM bindings
    let nameEdit, descriptionEdit
    // Functions
    function handleMouseenter() {
        showEditButton = true
    }
    function handleMouseleave() {
        showEditButton = false
    }
    function methodCall(method) {
        let params = {
            name: nameEdit?.innerText,
            description: descriptionEdit?.innerText,
            id: _id
        }

        Meteor.call(method, params, active, (err, res)=> {
            if (res) toastr.success('Saved')
            if (err) toastr.error('Please try again')
        })
    }
    function handleRequest(event) {
        let request = event.detail.request
        switch(request) {
            case 'delete': 
                Meteor.call('removeTask', _id, active, (err, res)=> {
                    if (res) toastr.error('Task Deleted')
                    if (err) toastr.warning('Please try again')
                })
                break;
            case 'edit':
                editing = true
                break;
            case 'snooze':
                methodCall('addToSnoozed')
                break;
            case 'undone':
                methodCall('unsnoozed')
                break;
            case 'done': 
                methodCall('addToDone')
                break;
        }
    }
    function cancelEdit() {
        editing = false
    }
</script>
<li 
    class="taskItemContainer" 
    on:mouseenter={handleMouseenter}
    on:mouseleave={handleMouseleave}
>
    {#if showEditButton}
        <EditButtons on:request={handleRequest} {app}/>
    {/if}
    {#if !editing}
        <div 
            class="name" 
            bind:this={nameEdit}>{name}</div>
        <div 
            class="description" 
            bind:this={descriptionEdit}>{description}</div>
    {:else}
        <div 
            class="name" 
            contenteditable="true" 
            autofocus
            bind:this={nameEdit}
        >
            {name}
        </div>
        <div 
            class="description" 
            contenteditable="true"
            bind:this={descriptionEdit}
        >
            {description}
        </div>
        <button 
            class="savebtn" 
            type="submit" 
            on:click={()=> methodCall('saveEditTask')}
            on:keyup={(e)=> {if (e.key == 'Enter') methodCall('saveEditTask')}}
        >
            Save</button>
        <button class="cancelBtn" on:click={cancelEdit}>Cancel</button>
    {/if}
    
</li>