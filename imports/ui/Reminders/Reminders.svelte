<script>
    import { afterUpdate, onMount } from 'svelte';
    import {useTracker} from 'meteor/rdb:svelte-meteor-data'
    import {activeApp} from '../../api/stores'
    import RemindersList from './RemindersList.svelte'
    // Sets active app
    activeApp.set('reminders')
    // Local variables
    let name, date, time
    // Disables dates before current day
    afterUpdate(()=> {
        let today = new Date().toISOString().split('T')[0];
        document.getElementsByName("somedate")[0].setAttribute('min', today);
    })
    // Reactive variables
    $: currentUser = useTracker(()=> Meteor.user())
    // functions
    function processSubmit() {
        let params ={
            owner: $currentUser._id,
            username: $currentUser.username,
            reminder: {
                name,
                date,
                time,
            }
        }
        Meteor.call('addReminder', params, (err, res)=> {
            if (res) toastr.success('Reminder added')
            if (err) toastr.error('Please try again' + err)
        })
        resetForm()
    }
    function resetForm() {
        name = ''
        date = ''
        time = ''
    }
</script>
<h1>Reminders</h1>
<div class="sectionContainer">
    <label for="nameInput">Enter Name</label>
    <input 
        type="text" 
        id="nameInput" 
        class="nameInput" 
        placeholder="Enter name"
        bind:value={name}
    >
    <label for="datePicker">Select Date</label>
    <input 
        name="somedate"
        type="date" 
        class="dateInput"
        bind:value={date}
    >
    <label for="timePicker">Select Time</label>
    <input 
        type="time" 
        class="timeInput"
        bind:value={time}
    >
    <button 
        class="saveBtn" 
        on:click={processSubmit}
        on:keyup={(e)=> {if (e.key == "Enter") processSubmit()}}
    >Save</button>
</div>
<RemindersList />