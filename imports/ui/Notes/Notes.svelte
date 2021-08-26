<script>
    import {NotesCollection} from '../../api/Notes/NotesCollection'
    import NotesItem from './NotesItem.svelte';
    import { onMount } from 'svelte'
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import {activeApp} from '../../api/stores'
    activeApp.set('notes')
    onMount(()=> Meteor.subscribe('notes'))
    // Reactive Variables
    $: notes = useTracker(()=> NotesCollection.find({}).fetch()) 

    /**
     * 
  ___   __ __  ____  _      _     
 /   \ |  |  ||    || |    | |    
|     ||  |  | |  | | |    | |    
|  Q  ||  |  | |  | | |___ | |___ 
|     ||  :  | |  | |     ||     |
|     ||     | |  | |     ||     |
 \__,_| \__,_||____||_____||_____|
     */
    let textArea, options
    onMount(()=> {
        textArea = document.querySelector('.textArea')
        options = {
            placeholder: 'Type here to create note...',
            theme: 'snow'
        };
        new Quill(textArea, options);
    })

    function createNote() {
        let text = document.querySelector('.ql-editor').innerHTML
        Meteor.call('addNote', text)
        document.querySelector('.ql-editor').innerText = ''
    }
    
</script>

<h1>Secure Notes Creator</h1>
<div class="noteCreator">
    <div 
        name="textArea" 
        id="textArea" 
        class="textArea">
    </div>
</div>
<button class="createBtn" on:click={createNote}>Create</button>
<h2>Notes</h2>
{#each $notes.reverse() as note}
    <NotesItem {...note}/>
{/each}