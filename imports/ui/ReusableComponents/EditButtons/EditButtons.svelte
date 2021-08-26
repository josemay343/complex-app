<script>
    import tippy from 'tippy.js'
    import 'tippy.js/dist/tippy.css';
    import 'tippy.js/animations/scale-subtle.css';
    import {afterUpdate} from 'svelte';
    import { createEventDispatcher } from 'svelte';
    export let activeTab
    let deleteBtn, 
        editBtn,
        shareBtn,
        snoozebtn,
        doneBtn,
        notDoneBtn
    afterUpdate(()=> {
        tippy(deleteBtn, {
            content: 'Delete',
            animation: 'scale-subtle'
        })
        tippy(editBtn, {
            content: 'Edit',
            animation: 'scale-subtle'
        })
        tippy(shareBtn, {
            content: 'Share',
            animation: 'scale-subtle'
        })
        tippy(snoozebtn, {
            content: 'Snooze',
            animation: 'scale-subtle'
        })
        tippy(doneBtn, {
            content: 'Done',
            animation: 'scale-subtle'
        })
        tippy(notDoneBtn, {
            content: 'Mark undone',
            animation: 'scale-subtle'
        })
    })
    const dispatch = createEventDispatcher();

    function createRequest(request) {
		dispatch('request', {
			request
		});
	}
</script>

<div 
    bind:this={deleteBtn} 
    class="icon deleteBtn invert" 
    on:click={()=> createRequest('delete')}
>
    <img src="/images/icons/trash-alt-solid.svg" alt="">
</div>
<div 
    bind:this={editBtn} 
    class="icon editBtn invert"
    on:click={()=> createRequest('edit')}
>
    <img src="/images/icons/edit-solid.svg" alt="">
</div>
<div 
    bind:this={shareBtn} 
    class="icon shareBtn invert"
    on:click={()=> createRequest('share')}
>
    <img src="/images/icons/share-alt-square-solid.svg" alt="">
</div>
<div 
    bind:this={snoozebtn} 
    class="icon snoozeBtn invert"
    on:click={()=> createRequest('snooze')}
>
    <img src="/images/icons/hourglass-start-solid.svg" alt="">
</div>
<div 
    bind:this={doneBtn} 
    class="icon doneBtn invert"
    on:click={()=> createRequest('done')}
>
    <img src="/images/icons/check-circle-regular.svg" alt="">
</div>
<div
    bind:this={notDoneBtn}
    class="icon notDoneBtn invert"
    on:click={()=> createRequest('undone')}
>
    <img src="/images/icons/times-circle-regular.svg" alt="">
  </div>