<script lang="ts">
	import { enhance } from "$app/forms";

	let { data } = $props();
</script>

<svelte:head>
	<title>Pokerface</title>
	<meta name="description" content="Pokerface - planning poker app" />
</svelte:head>

<h1>Hi, {data.user.name}!</h1>
<p>Email: {data.user.email}</p>
<form method="post" use:enhance>
	<button>Sign out</button>
</form>