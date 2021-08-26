<script>
    import {activeTab} from '../../../api/stores'
    export let tabsArray;

    function setActiveTab(name) {
        activeTab.set(name)
    }
</script>

<div class="tabsContainer">
    {#each tabsArray as tab}
        <span class="tab" on:click={setActiveTab(tab.name)}>
            <span class='name'>{tab.name}</span>
            <span class="count {tab.className}">
                {#if tab.count}
                    {tab.count}
                    {:else}
                        0
                {/if}
            </span>
        </span>
    {/each}
</div>