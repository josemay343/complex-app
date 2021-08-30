<script>
    import { Meteor } from 'meteor/meteor';
    // Private variables
    let name;
    let description;
    // Props
    export let category;
    function addTask() {
        if (!name || !description) return toastr.error('fields Cannot be empty')
        let owner = {
            category,
            owner: Meteor.userId(),
            username: Meteor.user().username
        }
        let params = {
            name,
            description,
            
        }
        Meteor.call('addTask', owner, params, (err, res)=> {
            if (res) {
                name = '';
                description = '';
                toastr.success('Task Added')
            }
            if (err) toastr.error('Please Try again')
        }) 
    }
</script>

<div class="sectionContainer">
    <label for="taskInput">Add Task</label>
    <input 
        id="taskInput"
        class="addInput nameInput"
        type="text" 
        placeholder="Enter Task name"
        bind:value="{name}"
        on:keyup={(e)=> {if (e.key == "Enter") addTask()}}
    >
    <label for="description">Enter Description</label>
    <input 
        id="description"
        class="addInput descriptionInput"
        type="text" 
        placeholder="Enter Description"
        bind:value={description}
        on:keyup={(e)=> {if (e.key == 'Enter') addTask()}}
    >
    <button on:click={addTask}>Add</button>
</div>