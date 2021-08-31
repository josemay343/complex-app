<script>
    import {NotesCollection} from '../../api/Notes/NotesCollection'
    import { onMount } from 'svelte'
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import {activeApp} from '../../api/stores'
    import {Meteor} from 'meteor/meteor';
    import NotesItem from './NotesItem.svelte';
    let title = 'Hagana - Secure Notes'
    // Store set
    activeApp.set('notes')
    // Reactive Variables
    $: notes = useTracker(()=> NotesCollection.find({}).fetch()) 
    $: currentUser = useTracker(()=> Meteor.user())

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
    //LIfe cycle
    onMount(()=> {
        Meteor.subscribe('notes')
        textArea = document.querySelector('.textArea')
        options = {
            placeholder: 'Type here to create note...',
            theme: 'snow'
        };
        new Quill(textArea, options);
    })

    // Functions
    function createNote() {
        let note = document.querySelector('.ql-editor').innerHTML
        let params = {
            owner: Meteor.userId(),
            username: Meteor.user().username,
            note
        }
        Meteor.call('addNote', params, (err, res)=> {
            if (res) toastr.success('Note Added')
            if (err) toastr.error('Please try again' + err)
        })
        document.querySelector('.ql-editor').innerText = ''
    }
    
</script>

<svelte:head>
    // SEO head
    <title>{title}</title>
    <meta name="description" content="The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.">
</svelte:head>

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
    {#if note.owner === $currentUser._id}
        <NotesItem {...note}/>
    {/if}
{/each}