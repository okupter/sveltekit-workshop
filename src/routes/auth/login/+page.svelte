<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<svelte:head>
	<title>login</title>
</svelte:head>


<section class="space-y-16">
	<h1 class="text-4xl font-bold">login</h1>

	<form method="post" use:enhance class="flex flex-col gap-2 sm:w-8/12">
		{#if form?.error}
			<div class="px-4 py-2 mb-4 bg-red-50">
				<p>{form.message}</p>
			</div>
		{/if}

		<input type="email" name="email" placeholder="Email" required />
		<input type="password" name="password" placeholder="Password" required />

		<button type="submit" class="bg-gray-900 px-4 py-2 text-white w-fit !mt-8"
			>login</button
		>
	</form>
</section>
