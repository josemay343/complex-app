<script>
    import {onMount} from 'svelte'
    export let text, _id
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let textArea, options
    onMount(()=> {
        textArea = document.querySelector('#editTextArea')
        options = {
            placeholder: 'Type here to create note...',
            theme: 'snow'
        };
        new Quill(textArea, options);
    })

    function cancel() {
		dispatch('cancel', {
			action: 'cancel'
		});
	}

    function update() {
        let text = document.querySelector('#editTextArea > .ql-editor').innerHTML
        let params = {
            id: _id, 
            text
        }
        console.log(params)
        Meteor.call('saveEditNote', params, (err, res)=> {
            if (res) {

                toastr.success('Note Edited')
            }
            if (err) toastr.error('Please try again')
        })
        cancel()
    }
</script>

<div class="notesEditContainer">
    <div class="noteCreator">
        <div 
            id="editTextArea"
            name="textArea" 
            class="editTextArea">
            {@html text}
        </div>
    </div>
</div>
<div class="buttonsContainer">
    <button class="savebtn" on:click={update}>Save</button>
    <button class="cancelBtn" on:click={cancel}>Cancel</button>
</div>