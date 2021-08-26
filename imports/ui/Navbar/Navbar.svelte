<script>
    let loggedIn = false
</script>

<a href="/" class="nav">
    <div class="logo invert">
        <img src="/images/Asset 3@4x.png" alt="">
    </div>
</a>
<div class="navbar">
    <a href="/tasks" class="nav">Tasks</a>
    <a href="/notes" class="nav">Notes</a>
    <a href="reminders" class="nav">Reminders</a>
</div>
<div class="loginContainer">
    {#if loggedIn}
        <div class="title">Login</div>
        {:else}
        <div class="title">Logout</div>
    {/if}
</div>