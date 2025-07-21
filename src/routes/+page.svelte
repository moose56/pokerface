<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Pokerface</title>
	<meta name="description" content="Pokerface - planning poker app" />
</svelte:head>

<section>
	<h1>Pokerface</h1>

	<button>New</button>
	<button>Play</button>

	{#each data.users as user}
		<h2>{user.name}</h2>
		{#each user.posts as post}
			<ul>
				<li><a href={post.content}>{post.title}</a></li>
			</ul>
		{/each}
	{/each}
</section>