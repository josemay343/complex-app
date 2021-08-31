<script>
    import EditButtons from "../ReusableComponents/EditButtons/EditButtons.svelte"
    import NotesEdit from './NotesEdit.svelte'
    import {activeApp} from '../../api/stores'
    let app
    activeApp.subscribe(value=>{
        app = value
    })
    //Props
    export let note, _id
    // Reactive variables
    $: showEditButtons = false;
    $: showPopup = false

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
                Meteor.call('deleteNote', _id)
                break;
            case 'edit': {
                showPopup = true
            }
        }
    }
    function hidePopup() {
        showPopup = false
    }
</script>

<div 
    class="noteContainer"
    on:mouseenter={handleMouseenter}
    on:mouseleave={handleMouseleave}
>
    {#if showEditButtons}
        <EditButtons on:request={handleRequest} {app}/>
    {/if}
    {@html note}
</div>

{#if showPopup}
    <div class="editNotePopup">
        <div class="overlay"></div>
        <NotesEdit {note} {_id} on:cancel={hidePopup}/>
    </div>
{/if}
