<script>
import { dateToDateString } from 'simpl-schema/dist/utility';

    import RemindersList from './RemindersList.svelte'
    let name, date, time

    function processSubmit() {
        let params ={
            name,
            date,
            time
        }
        Meteor.call('addReminder', params, (err, res)=> {
            if (res) toastr.success('Reminder added')
            if (err) toastr.err('Please try again')
        })
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